/**
 * Aaditya Mathur Portfolio - Physics & Drag Engine
 * Implements realistic drag physics, velocity rotation, spring-back,
 * and magnetic snap attraction for hero chips & the "DRAG ME" widget.
 */

(function () {
  'use strict';

  // Canvas Trail Setup (Subtle blade/glow trail)
  const canvas = document.getElementById('trail-canvas');
  let ctx = null;
  const particles = [];

  if (canvas && canvas.getContext) {
    ctx = canvas.getContext('2d');
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function renderParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.03;
        p.size *= 0.96;

        if (p.alpha <= 0 || p.size < 0.5) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace('ALPHA', p.alpha.toFixed(2));
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#38bdf8';
        ctx.fill();
        ctx.restore();
      }
      requestAnimationFrame(renderParticles);
    }
    requestAnimationFrame(renderParticles);
  }

  function emitTrail(x, y, color) {
    if (!ctx) return;
    for (let i = 0; i < 2; i++) {
      particles.push({
        x: x + (Math.random() - 0.5) * 8,
        y: y + (Math.random() - 0.5) * 8,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3.5 + 2,
        alpha: 0.8,
        color: color || 'rgba(56, 189, 248, ALPHA)'
      });
    }
  }

  /**
   * Hero Draggable Skill Chips System
   */
  const chips = document.querySelectorAll('.draggable-chip');
  const dropZone = document.getElementById('profile-drop-zone');
  const dropIndicator = document.getElementById('drop-indicator');

  chips.forEach((chip) => {
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    let prevPointerX = 0;
    let prevPointerY = 0;
    let velocityX = 0;
    let animFrameId = null;

    chip.addEventListener('pointerdown', (e) => {
      // Allow primary mouse button or touch
      if (e.button !== 0 && e.pointerType === 'mouse') return;

      isDragging = true;
      chip.classList.add('dragging');
      chip.setPointerCapture(e.pointerId);

      startX = e.clientX - currentX;
      startY = e.clientY - currentY;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
      velocityX = 0;

      if (animFrameId) cancelAnimationFrame(animFrameId);
      
      // Update cursor ring style if available
      const cursorRing = document.getElementById('custom-cursor-ring');
      if (cursorRing) cursorRing.classList.add('cursor-drag');
    });

    chip.addEventListener('pointermove', (e) => {
      if (!isDragging) return;

      currentX = e.clientX - startX;
      currentY = e.clientY - startY;

      velocityX = e.clientX - prevPointerX;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;

      // Rotation proportional to movement velocity
      const rotateDeg = Math.max(-25, Math.min(25, velocityX * 1.5));
      chip.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) rotate(${rotateDeg}deg)`;

      // Emit subtle drag sparks
      emitTrail(e.clientX, e.clientY, 'rgba(56, 189, 248, ALPHA)');

      // Proximity check with Profile Drop Zone
      if (dropZone && dropIndicator) {
        const dropRect = dropZone.getBoundingClientRect();
        const dropCenterX = dropRect.left + dropRect.width / 2;
        const dropCenterY = dropRect.top + dropRect.height / 2;

        const dist = Math.hypot(e.clientX - dropCenterX, e.clientY - dropCenterY);
        if (dist < 140) {
          dropIndicator.style.opacity = '1';
        } else {
          dropIndicator.style.opacity = '0';
        }
      }
    });

    function endDrag(e) {
      if (!isDragging) return;
      isDragging = false;
      chip.classList.remove('dragging');
      chip.releasePointerCapture(e.pointerId);

      const cursorRing = document.getElementById('custom-cursor-ring');
      if (cursorRing) cursorRing.classList.remove('cursor-drag');

      // Check magnetic snap to profile
      let snapped = false;
      if (dropZone) {
        const dropRect = dropZone.getBoundingClientRect();
        const dropCenterX = dropRect.left + dropRect.width / 2;
        const dropCenterY = dropRect.top + dropRect.height / 2;
        const dist = Math.hypot(e.clientX - dropCenterX, e.clientY - dropCenterY);

        if (dist < 140) {
          snapped = true;
          triggerMagneticAttraction(chip, dropCenterX, dropCenterY);
        }
      }

      if (dropIndicator) dropIndicator.style.opacity = '0';

      if (!snapped) {
        // Spring physics return back to initial origin (0, 0)
        springBackToOrigin();
      }
    }

    chip.addEventListener('pointerup', endDrag);
    chip.addEventListener('pointercancel', endDrag);

    function springBackToOrigin() {
      let vx = velocityX * 0.4;
      let vy = 0;
      const k = 0.14; // spring stiffness
      const friction = 0.78; // damping

      function tick() {
        const forceX = -k * currentX;
        const forceY = -k * currentY;

        vx = (vx + forceX) * friction;
        vy = (vy + forceY) * friction;

        currentX += vx;
        currentY += vy;

        const rotateDeg = Math.max(-20, Math.min(20, vx * 2));
        chip.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) rotate(${rotateDeg}deg)`;

        if (Math.abs(currentX) > 0.5 || Math.abs(currentY) > 0.5 || Math.abs(vx) > 0.5) {
          animFrameId = requestAnimationFrame(tick);
        } else {
          currentX = 0;
          currentY = 0;
          chip.style.transform = 'translate3d(0, 0, 0) rotate(0deg)';
        }
      }
      animFrameId = requestAnimationFrame(tick);
    }

    function triggerMagneticAttraction(element, targetX, targetY) {
      // Glow and pulse effect on avatar
      const profileImg = document.getElementById('profile-img');
      if (profileImg) {
        profileImg.style.transform = 'scale(1.08)';
        setTimeout(() => {
          profileImg.style.transform = 'scale(1)';
        }, 400);
      }

      // Play particle burst
      for (let i = 0; i < 15; i++) {
        emitTrail(targetX, targetY, 'rgba(56, 189, 248, ALPHA)');
      }

      // Smoothly snap chip back home after magnetic celebration
      setTimeout(() => {
        springBackToOrigin();
      }, 500);
    }
  });

  /**
   * Special "DRAG ME" Floating Tactical Panel Widget
   */
  const dragPanel = document.getElementById('drag-me-panel');
  if (dragPanel) {
    let isDraggingPanel = false;
    let panelStartX = 0;
    let panelStartY = 0;
    let panelCurrentX = 0;
    let panelCurrentY = 0;
    let prevX = 0;
    let prevY = 0;
    let velX = 0;
    let panelAnimId = null;

    dragPanel.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      isDraggingPanel = true;
      dragPanel.classList.add('dragging');
      dragPanel.setPointerCapture(e.pointerId);

      panelStartX = e.clientX - panelCurrentX;
      panelStartY = e.clientY - panelCurrentY;
      prevX = e.clientX;
      prevY = e.clientY;
      velX = 0;

      if (panelAnimId) cancelAnimationFrame(panelAnimId);
    });

    dragPanel.addEventListener('pointermove', (e) => {
      if (!isDraggingPanel) return;
      panelCurrentX = e.clientX - panelStartX;
      panelCurrentY = e.clientY - panelStartY;

      velX = e.clientX - prevX;
      prevX = e.clientX;
      prevY = e.clientY;

      const rot = Math.max(-20, Math.min(20, velX * 1.8));
      dragPanel.style.transform = `translate3d(${panelCurrentX}px, ${panelCurrentY}px, 0) rotate(${rot}deg)`;
      emitTrail(e.clientX, e.clientY, 'rgba(96, 165, 250, ALPHA)');
    });

    function endPanelDrag(e) {
      if (!isDraggingPanel) return;
      isDraggingPanel = false;
      dragPanel.classList.remove('dragging');
      dragPanel.releasePointerCapture(e.pointerId);

      // Smooth spring return to original bottom-right position
      let vx = velX * 0.3;
      let vy = 0;
      const k = 0.12;
      const friction = 0.8;

      function tickPanel() {
        const fx = -k * panelCurrentX;
        const fy = -k * panelCurrentY;
        vx = (vx + fx) * friction;
        vy = (vy + fy) * friction;
        panelCurrentX += vx;
        panelCurrentY += vy;

        const rot = Math.max(-15, Math.min(15, vx * 2));
        dragPanel.style.transform = `translate3d(${panelCurrentX}px, ${panelCurrentY}px, 0) rotate(${rot}deg)`;

        if (Math.abs(panelCurrentX) > 0.5 || Math.abs(panelCurrentY) > 0.5 || Math.abs(vx) > 0.5) {
          panelAnimId = requestAnimationFrame(tickPanel);
        } else {
          panelCurrentX = 0;
          panelCurrentY = 0;
          dragPanel.style.transform = 'translate3d(0, 0, 0) rotate(0deg)';
        }
      }
      panelAnimId = requestAnimationFrame(tickPanel);
    }

    dragPanel.addEventListener('pointerup', endPanelDrag);
    dragPanel.addEventListener('pointercancel', endPanelDrag);
  }

})();
