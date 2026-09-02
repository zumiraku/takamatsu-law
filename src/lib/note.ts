export const NOTE_PROFILE = {
  name: "Saiko-Seiko",
  urlname: "saikoseiko",
  url: "https://note.com/saikoseiko",
} as const;

export type NotePost = {
  id: number;
  title: string;
  url: string;
  publishedAt: string;
  likeCount: number;
  commentCount: number;
  price: number | null;
  paid: boolean;
  eyecatch: string | null;
};

type NoteApiItem = {
  id: number;
  name: string;
  noteUrl?: string;
  key: string;
  publishAt: string;
  likeCount?: number;
  commentCount?: number;
  price?: number;
  eyecatch?: string;
  priceInfo?: { isFree?: boolean; lowestPrice?: number | null };
};

type NoteApiResponse = {
  data?: { contents?: NoteApiItem[] };
};

export async function fetchNotePosts(limit = 6): Promise<NotePost[]> {
  try {
    const res = await fetch(
      `https://note.com/api/v2/creators/${NOTE_PROFILE.urlname}/contents?kind=note&page=1`,
      { headers: { Accept: "application/json" } },
    );
    if (!res.ok) return [];
    const json = (await res.json()) as NoteApiResponse;
    const items = json.data?.contents ?? [];
    return items.slice(0, limit).map((item) => {
      const paid = item.priceInfo?.isFree === false || (item.price ?? 0) > 0;
      const price = item.priceInfo?.lowestPrice ?? item.price ?? null;
      return {
        id: item.id,
        title: item.name,
        url: item.noteUrl ?? `${NOTE_PROFILE.url}/n/${item.key}`,
        publishedAt: item.publishAt.slice(0, 10),
        likeCount: item.likeCount ?? 0,
        commentCount: item.commentCount ?? 0,
        price: paid ? price : null,
        paid,
        eyecatch: item.eyecatch ?? null,
      };
    });
  } catch {
    return [];
  }
}

export const formatNotePrice = (n: number) =>
  `¥${n.toLocaleString("ja-JP")}`;
