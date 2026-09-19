import React, { useLayoutEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import './ScrollStack.css';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

export const ScrollStack = ({
  children,
  className = '',
  itemDistance = 40,
  itemScale = 0.03,
  itemStackDistance = 24,
  stackPosition = '12%',
  scaleEndPosition = '6%',
  baseScale = 0.9,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = true,
  onStackComplete,
}) => {
  const scrollerRef = useRef(null);
  const endRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef(null);
  const lenisRef = useRef(null);
  const cardsRef = useRef([]);
  const initialTopsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return typeof value === 'number' ? value : parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
      };
    } else {
      const scroller = scrollerRef.current;
      return {
        scrollTop: scroller ? scroller.scrollTop : 0,
        containerHeight: scroller ? scroller.clientHeight : 0,
      };
    }
  }, [useWindowScroll]);

  const updateInitialTops = useCallback(() => {
    const cards = cardsRef.current;
    if (!cards || !cards.length) return;

    // Temporarily clear transforms and endRef margin to get true un-transformed static tops
    const savedTransforms = cards.map((c) => (c ? c.style.transform : ''));
    cards.forEach((c) => {
      if (c) c.style.transform = 'none';
    });
    if (endRef.current) {
      endRef.current.style.marginTop = '0px';
    }

    initialTopsRef.current = cards.map((c) => {
      if (!c) return 0;
      const rect = c.getBoundingClientRect();
      return rect.top + window.scrollY;
    });

    // Restore previous transforms
    cards.forEach((c, i) => {
      if (c) c.style.transform = savedTransforms[i] || 'translateZ(0)';
    });
  }, []);

  const updateCardTransforms = useCallback(() => {
    const cards = cardsRef.current;
    const numCards = cards.length;
    if (!numCards || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    // Calculate when the last card reaches its stack position
    const lastCardIdx = numCards - 1;
    const lastCardTop = initialTopsRef.current[lastCardIdx] || 0;
    const lastPinStart = lastCardTop - stackPositionPx - itemStackDistance * lastCardIdx;

    // Pin hold duration after last card stacks (e.g. 180px)
    const holdDistance = Math.min(200, containerHeight * 0.2);
    const pinEnd = lastPinStart + holdDistance;

    // Height of the last card and screen Y of stacked deck bottom
    const lastCardHeight = cards[lastCardIdx] ? cards[lastCardIdx].offsetHeight : 500;
    const stackedDeckBottom = stackPositionPx + itemStackDistance * lastCardIdx + lastCardHeight;

    // Adjust scroll-stack-end position in document flow so next section starts right below stackedDeckBottom
    if (endRef.current) {
      const scrollerEndDocTop = pinEnd + stackedDeckBottom + 40;
      const staticEndDocTop = lastCardTop + lastCardHeight;
      const extraMargin = scrollerEndDocTop - staticEndDocTop;
      endRef.current.style.marginTop = `${Math.max(0, extraMargin)}px`;
    }

    cards.forEach((card, i) => {
      if (!card) return;

      const cardTop = initialTopsRef.current[i] || 0;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;

      const triggerStart = pinStart;
      const triggerEnd = cardTop - scaleEndPositionPx;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < numCards; j++) {
          const jCardTop = initialTopsRef.current[j] || 0;
          const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }

        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          blur = Math.max(0, depthInStack * blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

        card.style.transform = transform;
        card.style.filter = filter;

        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === numCards - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          if (onStackComplete) onStackComplete();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData,
  ]);

  const handleScroll = useCallback(() => {
    updateCardTransforms();
  }, [updateCardTransforms]);

  const setupLenis = useCallback(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', handleScroll);

    const raf = (time) => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);

    lenisRef.current = lenis;
    return lenis;
  }, [handleScroll]);

  useLayoutEffect(() => {
    const cards = Array.from(document.querySelectorAll('.scroll-stack-card'));
    cardsRef.current = cards;

    cards.forEach((card, i) => {
      card.style.zIndex = `${i + 1}`;
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      card.style.perspective = '1000px';
    });

    updateInitialTops();
    setupLenis();
    updateCardTransforms();

    const handleResize = () => {
      updateInitialTops();
      updateCardTransforms();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('load', handleResize);

    const lastTransforms = lastTransformsRef.current;

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      stackCompletedRef.current = false;
      cardsRef.current = [];
      initialTopsRef.current = [];
      lastTransforms.clear();
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    setupLenis,
    updateCardTransforms,
    updateInitialTops,
  ]);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" ref={endRef} />
      </div>
    </div>
  );
};

export default ScrollStack;
