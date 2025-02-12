import React, { useEffect, useRef } from 'react';

interface ScrollSectionProps {
  children: React.ReactNode;
}

const ScrollSection: React.FC<ScrollSectionProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const handleScroll = () => {
      const scrollStart = container.offsetTop;
      const scrollEnd = scrollStart + container.offsetHeight - window.innerHeight;

      const scrollY = window.scrollY;
      const scrollRange = scrollEnd - scrollStart;
      const scrollProgress = Math.min(Math.max((scrollY - scrollStart) / scrollRange, 0), 1);

      const maxHorizontalScroll = content.scrollWidth - window.innerWidth;
      const horizontalScroll = maxHorizontalScroll * scrollProgress;

      content.style.transform = `translateX(-${horizontalScroll}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="h-[350vh]"> {/* Mayor altura para más scroll */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          ref={contentRef}
          className="flex min-w-[320vw] h-screen transition-transform duration-100 ease-out"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default ScrollSection;