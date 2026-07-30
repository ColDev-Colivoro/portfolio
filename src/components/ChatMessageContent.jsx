const BULLET_ITEM = /^\s*[-*]\s+(.+)$/;
const ORDERED_ITEM = /^\s*\d+[.)]\s+(.+)$/;
const INLINE_LINK = /\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s<]+)/gi;
const TRAILING_URL_PUNCTUATION = /[.,;:!?]+$/;

const getListItem = (line) => {
	const bullet = line.match(BULLET_ITEM);
	if (bullet) return { type: 'unordered', text: bullet[1] };

	const ordered = line.match(ORDERED_ITEM);
	if (ordered) return { type: 'ordered', text: ordered[1] };

	return null;
};

export const parseChatMessage = (content = '') => {
	const lines = String(content).replace(/\r\n?/g, '\n').split('\n');
	const blocks = [];
	let paragraphLines = [];
	let list = null;

	const flushParagraph = () => {
		if (!paragraphLines.length) return;
		blocks.push({ type: 'paragraph', text: paragraphLines.join('\n') });
		paragraphLines = [];
	};

	const flushList = () => {
		if (!list) return;
		blocks.push(list);
		list = null;
	};

	for (const line of lines) {
		if (!line.trim()) {
			flushParagraph();
			flushList();
			continue;
		}

		const item = getListItem(line);
		if (item) {
			flushParagraph();
			if (list?.type !== item.type) flushList();
			list ??= { type: item.type, items: [] };
			list.items.push(item.text);
			continue;
		}

		flushList();
		paragraphLines.push(line.trim());
	}

	flushParagraph();
	flushList();
	return blocks;
};

const splitTrailingPunctuation = (url) => {
	const punctuation = url.match(TRAILING_URL_PUNCTUATION)?.[0] ?? '';
	return { url: punctuation ? url.slice(0, -punctuation.length) : url, punctuation };
};

const renderInlineContent = (text) => {
	const parts = [];
	let cursor = 0;

	for (const match of text.matchAll(INLINE_LINK)) {
		if (match.index > cursor) parts.push(text.slice(cursor, match.index));

		const rawUrl = match[2] ?? match[3];
		const { url, punctuation } = splitTrailingPunctuation(rawUrl);
		const label = match[1] ?? url;

		parts.push(
			<a
				key={`link-${match.index}`}
				href={url}
				target="_blank"
				rel="noopener noreferrer"
				className="font-medium text-accent underline decoration-accent/50 underline-offset-2 hover:decoration-accent"
			>
				{label}
			</a>,
		);
		if (punctuation) parts.push(punctuation);
		cursor = match.index + match[0].length;
	}

	if (cursor < text.length) parts.push(text.slice(cursor));
	return parts;
};

const ChatMessageContent = ({ content }) => (
	<div className="space-y-2.5 break-words">
		{parseChatMessage(content).map((block, blockIndex) => {
			if (block.type === 'unordered') {
				return (
					<ul key={`list-${blockIndex}`} aria-label="Elementos" className="list-disc space-y-1 pl-5 marker:text-accent">
						{block.items.map((item, itemIndex) => (
							<li key={`${blockIndex}-${itemIndex}`}>{renderInlineContent(item)}</li>
						))}
					</ul>
				);
			}

			if (block.type === 'ordered') {
				return (
					<ol key={`list-${blockIndex}`} aria-label="Pasos" className="list-decimal space-y-1 pl-5 marker:text-accent">
						{block.items.map((item, itemIndex) => (
							<li key={`${blockIndex}-${itemIndex}`}>{renderInlineContent(item)}</li>
						))}
					</ol>
				);
			}

			return (
				<p key={`paragraph-${blockIndex}`} className="whitespace-pre-line leading-relaxed">
					{renderInlineContent(block.text)}
				</p>
			);
		})}
	</div>
);

export default ChatMessageContent;
