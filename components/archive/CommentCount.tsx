'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Props {
  slug: string;
  className?: string; // 위치에 따라 스타일 조금씩 바꿀 수 있게
}

export default function CommentCount({ slug, className = '' }: Props) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      // count: 'exact', head: true -> 데이터를 안 가져오고 개수만 셉니다 (빠름!)
      const { count } = await supabase
        .from('comments')
        .select('*', { count: 'exact', head: true })
        .eq('slug', slug);

      setCount(count);
    };

    fetchCount();
  }, [slug]);

  // 로딩 중이거나 댓글이 0개면 아예 숨김 (깔끔함 유지)
  if (count === null || count === 0) return null;

  return (
    <span
      className={`inline-flex items-center text-xs font-medium text-slate-500 ${className}`}
    >
      💬 {count}
    </span>
  );
}
