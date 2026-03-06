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
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('id, username, content, created_at')
        .eq('slug', slug)
        .order('created_at', { ascending: true });

      if (error) console.error('댓글 에러:', error);
      else setComments(data || []);
    };

    fetchComments();
  }, [slug, refreshTrigger]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!username || !password || !content)
      return alert('모든 항목을 입력해주세요!');
    setLoading(true);

    const { error } = await supabase
      .from('comments')
      .insert([{ slug, username, password, content }]);

    setLoading(false);
    if (error) {
      alert('댓글 등록 실패!');
    } else {
      setContent('');
      setRefreshTrigger((prev) => prev + 1);
    }
  };

  const handleDelete = async (id: string) => {
    const inputPassword = prompt('삭제를 위해 비밀번호를 입력해주세요.');
    if (!inputPassword) return;

    const { data, error } = await supabase
      .from('comments')
      .delete()
      .eq('id', id)
      .eq('password', inputPassword)
      .select();

    if (error) {
      alert('삭제 중 에러가 발생했습니다.');
    } else if (data && data.length === 0) {
      alert('비밀번호가 틀렸습니다!');
    } else {
      alert('삭제되었습니다.');
      setRefreshTrigger((prev) => prev + 1);
    }
  };

  return (
    <div className="font-isyun mt-24 border-t border-white/5 pt-16">
      <div className="mb-10 flex items-center justify-between">
        <h3 className="text-xl font-black text-white">
          RESPONSE <span className="ml-2 text-blue-500">{comments.length}</span>
        </h3>
        <span className="text-[10px] font-bold tracking-widest text-slate-700 uppercase">
          Secured Database
        </span>
      </div>

      {/* 댓글 목록 */}
      <ul className="mb-16 space-y-10">
        {comments.map((comment) => (
          <li
            key={comment.id}
            className="group animate-in fade-in slide-in-from-bottom-2 flex gap-5"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-xl shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
              👾
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-100">
                    {comment.username}
                  </span>
                  <span className="font-mono text-[10px] font-medium tracking-widest text-slate-600 uppercase">
                    {new Date(comment.created_at).toLocaleDateString()}
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="text-[10px] font-black tracking-tighter text-slate-700 uppercase opacity-0 transition-all group-hover:opacity-100 hover:text-red-500/80"
                >
                  [ Delete ]
                </button>
              </div>
              <p className="text-[15px] leading-relaxed font-light whitespace-pre-wrap text-slate-300">
                {comment.content}
              </p>
            </div>
          </li>
        ))}
        {/* "첫 번째 주인공" 문구 삭제 및 깔끔한 빈 상태 디자인 */}
        {comments.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/5 bg-white/1 py-12">
            <span className="text-xs font-bold tracking-widest text-slate-700 uppercase">
              No response recorded
            </span>
          </div>
        )}
      </ul>

      {/* 댓글 입력 폼 */}
      <form
        onSubmit={handleSubmit}
        className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/3 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl"
      >
        <div className="mb-6 flex gap-4">
          <input
            type="text"
            placeholder="NICKNAME"
            className="w-1/2 rounded-2xl border border-white/5 bg-black/40 p-4 text-sm font-bold tracking-tight text-white transition-all placeholder:text-slate-700 focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/40 focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="PASSWORD"
            className="w-1/2 rounded-2xl border border-white/5 bg-black/40 p-4 text-sm font-bold tracking-tight text-white transition-all placeholder:text-slate-700 focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/40 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <textarea
          placeholder="Share your insights..."
          className="h-32 w-full resize-none rounded-2xl border border-white/5 bg-black/40 p-5 text-sm leading-relaxed font-medium text-white transition-all placeholder:text-slate-700 focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/40 focus:outline-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <div className="mt-5 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="group relative overflow-hidden rounded-2xl bg-blue-600 px-10 py-4 text-xs font-black tracking-[0.2em] text-white transition-all hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] disabled:opacity-50"
          >
            <span className="relative z-10">
              {loading ? 'SYNCING...' : 'POST RESPONSE'}
            </span>
            <div className="absolute inset-0 translate-y-full bg-white/10 transition-transform group-hover:translate-y-0" />
          </button>
        </div>

        {/* 장식용 도트 디자인 */}
        <div className="pointer-events-none absolute top-0 right-0 p-4 opacity-10 select-none">
          <div className="grid grid-cols-3 gap-1">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="h-1 w-1 rounded-full bg-white" />
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
