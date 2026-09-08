import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
  MessageCircle,
  Share2
} from 'lucide-react';

const galleryAsset = (fileName: string) => `/gallery-assets/${fileName}`;

const POSTS = [
  {
    title: '风过发梢',
    subtitle: '回廊深处的风掠过发丝，亮处与暗处都刚刚好。',
    image: galleryAsset('preview/preview-06.jpg'),
    location: '回廊光影 / 逆光',
    tags: ['回廊', '微风', '逆光']
  },
  {
    title: '光影入画',
    subtitle: '门扉投下斑驳树影，安静的侧脸停在午后光线里。',
    image: galleryAsset('preview/preview-02.jpg'),
    location: '园中小景 / 光影',
    tags: ['侧影', '树影', '团扇']
  },
  {
    title: '水边回眸',
    subtitle: '湖面碎光映着花枝，镜头把这一刻收得温柔而明亮。',
    image: galleryAsset('preview/preview-03.jpg'),
    location: '临水取景 / 波光',
    tags: ['波光', '花束', '回眸']
  },
  {
    title: '扇底清风',
    subtitle: '折扇轻抬，园石与绿意把夏日的层次铺开。',
    image: galleryAsset('preview/preview-04.jpg'),
    location: '园林午后 / 折扇',
    tags: ['折扇', '浅紫', '夏意']
  },
  {
    title: '栏边照影',
    subtitle: '团扇借来一束高光，木栏与水色托住从容的姿态。',
    image: galleryAsset('preview/preview-05.jpg'),
    location: '水榭回廊 / 栏边',
    tags: ['团扇', '逆光', '水榭']
  },
  {
    title: '檐下初见',
    subtitle: '黛瓦与凌霄花之间，一抹浅紫旗袍从园林小径里走来。',
    image: galleryAsset('preview/preview-01.jpg'),
    location: '江南园林 / 檐下',
    tags: ['黛瓦', '旗袍', '暮色']
  },
  {
    title: '亭畔留白',
    subtitle: '远处亭影虚化成背景，画面把目光留给安静的神情。',
    image: galleryAsset('preview/preview-07.jpg'),
    location: '古亭水岸 / 留白',
    tags: ['亭影', '留白', '人像']
  }
];

export default function PreviewApp() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const touchStartX = useRef<number | null>(null);

  const activePost = POSTS[currentIndex];
  const liked = likedPosts.includes(activePost.title);
  const saved = savedPosts.includes(activePost.title);

  const goToSlide = useCallback((index: number) => {
    const nextIndex = (index + POSTS.length) % POSTS.length;
    setCurrentIndex(nextIndex);
  }, []);

  const goPrev = useCallback(() => goToSlide(currentIndex - 1), [currentIndex, goToSlide]);
  const goNext = useCallback(() => goToSlide(currentIndex + 1), [currentIndex, goToSlide]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        goPrev();
      }
      if (event.key === 'ArrowRight') {
        goNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev]);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;

    const diff = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(diff) < 48) return;
    if (diff > 0) {
      goPrev();
    } else {
      goNext();
    }
  };

  const toggleValue = (value: string, list: string[], setter: (next: string[]) => void) => {
    setter(list.includes(value) ? list.filter(item => item !== value) : [...list, value]);
  };

  return (
    <div className="h-screen overflow-hidden bg-[#050505] text-white">
      <main
        className="relative h-screen w-screen touch-pan-y overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={activePost.image}
          alt=""
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-25 blur-2xl transition-all duration-500"
        />
        <div className="absolute inset-0 bg-black/58" />

        <div
          className="relative z-10 flex h-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translateX(-${currentIndex * 100}vw)` }}
        >
          {POSTS.map((post) => (
            <section key={post.title} className="relative flex h-screen w-screen flex-none items-center justify-center overflow-hidden px-0 sm:px-5">
              <div
                className="relative h-full w-full overflow-hidden bg-black shadow-2xl shadow-black/70 sm:h-[calc(100vh-32px)] sm:rounded-[22px]"
                style={{ maxWidth: 'min(100vw, calc((100vh - 32px) * 0.6667))' }}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0.04)_30%,rgba(0,0,0,0.10)_52%,rgba(0,0,0,0.86)_100%)]" />
              </div>
            </section>
          ))}
        </div>

        <header className="pointer-events-none absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.36em] text-white/42">Gallery</p>
            <h1 className="mt-1 text-lg font-black tracking-tight text-white sm:text-xl">园林人像</h1>
          </div>
          <div className="pointer-events-auto rounded-full border border-white/16 bg-black/32 px-3 py-1.5 text-xs font-bold text-white/78 backdrop-blur-md">
            园林写真
          </div>
        </header>

        <button
          onClick={goPrev}
          className="absolute left-5 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/36 text-white backdrop-blur-md transition hover:bg-white hover:text-black lg:flex"
          aria-label="上一张"
        >
          <ChevronLeft className="h-7 w-7" />
        </button>
        <button
          onClick={goNext}
          className="absolute right-5 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/36 text-white backdrop-blur-md transition hover:bg-white hover:text-black lg:flex"
          aria-label="下一张"
        >
          <ChevronRight className="h-7 w-7" />
        </button>

        <aside className="absolute bottom-28 right-3 z-20 flex flex-col items-center gap-3 sm:bottom-32 sm:right-[calc(50vw-min(50vw,calc((100vh-32px)*0.33335))+14px)]">
          <button
            onClick={() => toggleValue(activePost.title, likedPosts, setLikedPosts)}
            className={`flex h-12 w-12 items-center justify-center rounded-full border text-white shadow-xl shadow-black/30 backdrop-blur-md transition active:scale-95 sm:h-[52px] sm:w-[52px] ${
              liked
                ? 'border-rose-300 bg-rose-500'
                : 'border-white/18 bg-white/14 hover:bg-white/24'
            }`}
            aria-label={liked ? '取消喜欢' : '喜欢'}
          >
            <Heart className={`h-6 w-6 ${liked ? 'fill-white' : ''}`} />
          </button>

          <button
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/18 bg-white/14 text-white shadow-xl shadow-black/30 backdrop-blur-md transition hover:bg-white/24 active:scale-95 sm:h-[52px] sm:w-[52px]"
            aria-label="评论"
          >
            <MessageCircle className="h-6 w-6" />
          </button>

          <button
            onClick={() => toggleValue(activePost.title, savedPosts, setSavedPosts)}
            className={`flex h-12 w-12 items-center justify-center rounded-full border text-white shadow-xl shadow-black/30 backdrop-blur-md transition hover:bg-white/24 active:scale-95 sm:h-[52px] sm:w-[52px] ${
              saved ? 'border-amber-300 bg-amber-400/80' : 'border-white/18 bg-white/14'
            }`}
            aria-label={saved ? '取消收藏' : '收藏'}
          >
            <Bookmark className={`h-6 w-6 ${saved ? 'fill-white' : ''}`} />
          </button>

          <button
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/18 bg-white/14 text-white shadow-xl shadow-black/30 backdrop-blur-md transition hover:bg-white/24 active:scale-95 sm:h-[52px] sm:w-[52px]"
            aria-label="分享"
          >
            <Share2 className="h-6 w-6" />
          </button>
        </aside>

        <section
          className="absolute bottom-0 left-0 right-16 z-20 px-4 pb-5 sm:left-1/2 sm:right-auto sm:w-[min(100vw,calc((100vh-32px)*0.6667))] sm:-translate-x-1/2 sm:px-5 sm:pb-8"
        >
          <div className="mb-2.5 flex items-center gap-1.5">
            <span className="rounded-full bg-white px-2.5 py-0.5 text-[10px] font-black text-black">
              {String(currentIndex + 1).padStart(2, '0')} / {POSTS.length}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-white/16 bg-black/28 px-2.5 py-0.5 text-[10px] font-bold text-white/74 backdrop-blur">
              <MapPin className="h-2.5 w-2.5" />
              {activePost.location}
            </span>
          </div>

          <h2 className="max-w-lg text-2xl font-black leading-tight tracking-normal text-white drop-shadow-2xl sm:text-3xl">
            {activePost.title}
          </h2>
          <p className="mt-1.5 max-w-md text-xs font-semibold leading-5 text-white/70 sm:text-sm sm:leading-6">
            {activePost.subtitle}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {activePost.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/14 bg-white/10 px-2 py-0.5 text-[10px] font-black text-white/72 backdrop-blur-md">
                #{tag}
              </span>
            ))}
          </div>
        </section>

        <nav className="absolute bottom-4 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-white/12 bg-black/30 px-3 py-2 backdrop-blur-md sm:flex">
          {POSTS.map((post, index) => (
            <button
              key={post.title}
              onClick={() => goToSlide(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === currentIndex ? 'w-8 bg-white' : 'w-2.5 bg-white/34 hover:bg-white/60'
              }`}
              aria-label={`切换到 ${post.title}`}
            />
          ))}
        </nav>
      </main>
    </div>
  );
}
