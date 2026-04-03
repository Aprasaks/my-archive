import React from 'react';
import {
  Mail,
  Github,
  Instagram,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';

export default function ContactPage() {
  const email = 'heavenin24@naver.com';
  const githubId = 'Aprasaks';
  const kakaoOpenProfile = 'https://open.kakao.com/me/dechive';
  const instagramId = 'dechive13';

  return (
    <main className="mx-auto max-w-3xl px-6 py-32 text-zinc-400">
      <h1 className="mb-12 text-4xl font-bold tracking-tight text-white">
        Contact
      </h1>

      <div className="space-y-12 leading-relaxed">
        <section>
          <p className="text-lg text-zinc-300">
            Dechive의 지식 체계는 열린 소통을 통해 완성됩니다.{' '}
            <br className="hidden md:block" />
            프로젝트 제안이나 기술적 문의는 아래 채널을 통해 언제든 환영입니다.
          </p>
        </section>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Email */}
          <a
            href={`mailto:${email}`}
            className="group flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 transition-all hover:border-zinc-600 hover:bg-zinc-800/50"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3 text-zinc-100">
                <Mail size={20} className="text-blue-400" />
                <h2 className="text-lg font-bold">Email</h2>
              </div>
              <ExternalLink
                size={14}
                className="text-zinc-500 opacity-0 transition-opacity group-hover:opacity-100"
              />
            </div>
            <p className="mb-3 font-sans text-sm text-zinc-500">
              문의사항은 메일로 보내주세요.
            </p>
            <span className="text-zinc-200 underline underline-offset-4 transition-colors group-hover:text-blue-400">
              {email}
            </span>
          </a>

          {/* KakaoTalk Open Profile */}
          <a
            href={kakaoOpenProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 transition-all hover:border-zinc-600 hover:bg-zinc-800/50"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3 text-zinc-100">
                <MessageCircle size={20} className="text-yellow-400" />
                <h2 className="text-lg font-bold">KakaoTalk</h2>
              </div>
              <ExternalLink
                size={14}
                className="text-zinc-500 opacity-0 transition-opacity group-hover:opacity-100"
              />
            </div>
            <p className="mb-3 font-sans text-sm text-zinc-500">
              1:1 오픈채팅으로 빠르게 소통해요.
            </p>
            <span className="text-zinc-200 underline underline-offset-4 transition-colors group-hover:text-yellow-400">
              Open Profile
            </span>
          </a>

          {/* GitHub */}
          <a
            href={`https://github.com/${githubId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 transition-all hover:border-zinc-600 hover:bg-zinc-800/50"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3 text-zinc-100">
                <Github size={20} />
                <h2 className="text-lg font-bold">GitHub</h2>
              </div>
              <ExternalLink
                size={14}
                className="text-zinc-500 opacity-0 transition-opacity group-hover:opacity-100"
              />
            </div>
            <p className="mb-3 font-sans text-sm text-zinc-500">
              오픈소스 활동을 확인하세요.
            </p>
            <span className="text-zinc-200 underline underline-offset-4 transition-colors group-hover:text-white">
              github.com/{githubId}
            </span>
          </a>

          {/* Instagram - 이제 링크가 걸려요! */}
          <a
            href={`https://instagram.com/${instagramId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 transition-all hover:border-zinc-600 hover:bg-zinc-800/50"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3 text-zinc-100">
                <Instagram size={20} className="text-pink-500" />
                <h2 className="text-lg font-bold">Instagram</h2>
              </div>
              <ExternalLink
                size={14}
                className="text-zinc-500 opacity-0 transition-opacity group-hover:opacity-100"
              />
            </div>
            <p className="mb-3 font-sans text-sm text-zinc-500">
              일상과 프로젝트 소식을 전합니다.
            </p>
            <span className="text-zinc-200 underline underline-offset-4 transition-colors group-hover:text-pink-500">
              @{instagramId}
            </span>
          </a>
        </div>

        <p className="mt-20 text-xs text-zinc-600">
          Dechive Information Architecture © 2026
        </p>
      </div>
    </main>
  );
}
