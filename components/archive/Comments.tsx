'use client';

import { useEffect, useState, FormEvent } from 'react';
import { supabase } from '@/lib/supabase';

interface Comment {
  id: string;
  username: string;
  content: string;
  created_at: string;
}

export default function Comments({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  // 👇 치트키: 새로고침용 방아쇠 (이 숫자가 바뀌면 useEffect가 재실행됨)
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    // 함수를 useEffect 안에서 정의하고 바로 실행! (가장 안전함)
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('slug', slug)
        .order('created_at', { ascending: true });

      if (error) console.error('댓글 에러:', error);
      else setComments(data || []);
    };

    fetchComments();
  }, [slug, refreshTrigger]); // 👈 slug나 refreshTrigger가 바뀔 때만 실행됨!

  // 댓글 등록하기
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!username || !password || !content)
      return alert('모든 항목을 입력해주세요!');

    setLoading(true);

    const { error } = await supabase.from('comments').insert([
      {
        slug,
        username,
        password,
        content,
      },
    ]);

    setLoading(false);

    if (error) {
      alert('댓글 등록 실패 ㅠㅠ');
      console.error(error);
    } else {
      setContent('');
      // 👇 "야, 목록 새로고침 해!" 하고 방아쇠만 당기면 됨
      setRefreshTrigger((prev) => prev + 1);
    }
  };

  return (
    <div className="mt-16 border-t border-slate-200 pt-10">
      <h3 className="mb-6 text-xl font-bold text-slate-900">
        댓글 <span className="text-blue-600">{comments.length}</span>
      </h3>

      {/* 댓글 목록 */}
      <ul className="mb-10 space-y-6">
        {comments.map((comment) => (
          <li key={comment.id} className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg">
              👾
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900">
                  {comment.username}
                </span>
                <span className="text-xs text-slate-400">
                  {new Date(comment.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="leading-relaxed whitespace-pre-wrap text-slate-700">
                {comment.content}
              </p>
            </div>
          </li>
        ))}
        {comments.length === 0 && (
          <li className="text-sm text-slate-400">
            아직 댓글이 없어요. 첫 번째 주인공이 되어보세요! ✨
          </li>
        )}
      </ul>

      {/* 댓글 입력 폼 */}
      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-slate-200 bg-slate-50 p-6"
      >
        <div className="mb-4 flex gap-4">
          <input
            type="text"
            placeholder="닉네임"
            className="w-1/2 rounded-lg border border-slate-200 p-2 text-sm focus:border-blue-500 focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="비밀번호 (삭제용)"
            className="w-1/2 rounded-lg border border-slate-200 p-2 text-sm focus:border-blue-500 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <textarea
          placeholder="댓글을 남겨주세요..."
          className="h-24 w-full resize-none rounded-lg border border-slate-200 p-3 text-sm focus:border-blue-500 focus:outline-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <div className="mt-3 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? '등록 중...' : '댓글 남기기'}
          </button>
        </div>
      </form>
    </div>
  );
}
