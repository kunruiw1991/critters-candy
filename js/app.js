/**
 * Cut the Rope: Feed the Critters! (critters-candy)
 * 100% Pure Visual / Zero-Text Kid-Friendly Edition
 */

(() => {
  'use strict';

  const CW = 820;
  const CH = 540;

  // 8 Handcrafted Smiling Critters Stages (100% Visual, Zero Text)
  const LEVELS = [
    {
      id: 1,
      icon: 'icons/dogday.jpg',
      treat: '🍭',
      candyStart: { x: 410, y: 155 },
      critterPos: { x: 410, y: 445 },
      ropes: [{ x: 410, y: 55, len: 100 }],
      stars: [
        { x: 410, y: 235 },
        { x: 410, y: 305 },
        { x: 410, y: 370 }
      ],
      bubbles: [],
      bouncers: [],
      blowers: [],
      catchPins: []
    },
    {
      id: 2,
      icon: 'icons/hoppy.jpg',
      treat: '🍩',
      candyStart: { x: 290, y: 155 },
      critterPos: { x: 520, y: 445 },
      ropes: [
        { x: 200, y: 55, len: 135 },
        { x: 440, y: 55, len: 155 }
      ],
      stars: [
        { x: 350, y: 205 },
        { x: 465, y: 255 },
        { x: 515, y: 350 }
      ],
      bubbles: [],
      bouncers: [],
      blowers: [],
      catchPins: []
    },
    {
      id: 3,
      icon: 'icons/bobby.jpg',
      treat: '🧁',
      candyStart: { x: 260, y: 165 },
      critterPos: { x: 560, y: 165 },
      ropes: [{ x: 260, y: 55, len: 110 }],
      stars: [
        { x: 260, y: 265 },
        { x: 380, y: 265 },
        { x: 465, y: 185 }
      ],
      bubbles: [{ x: 260, y: 365 }],
      bouncers: [],
      blowers: [{ x: 145, y: 265, dirX: 1, dirY: -0.15 }],
      catchPins: []
    },
    {
      id: 4,
      icon: 'icons/picky.jpg',
      treat: '🎂',
      candyStart: { x: 240, y: 145 },
      critterPos: { x: 595, y: 435 },
      ropes: [{ x: 240, y: 50, len: 95 }],
      stars: [
        { x: 240, y: 245 },
        { x: 410, y: 235 },
        { x: 555, y: 325 }
      ],
      bubbles: [],
      bouncers: [{ x: 255, y: 365, vx: 6.2, vy: -8.8 }],
      blowers: [],
      catchPins: []
    },
    {
      id: 5,
      icon: 'icons/bubba.jpg',
      treat: '🍦',
      candyStart: { x: 410, y: 150 },
      critterPos: { x: 615, y: 435 },
      ropes: [
        { x: 270, y: 55, len: 165 },
        { x: 550, y: 55, len: 165 }
      ],
      stars: [
        { x: 410, y: 235 },
        { x: 525, y: 285 },
        { x: 605, y: 350 }
      ],
      bubbles: [],
      bouncers: [{ x: 435, y: 380, vx: 5.2, vy: -7.8 }],
      blowers: [{ x: 260, y: 235, dirX: 1, dirY: 0 }],
      catchPins: []
    },
    {
      id: 6,
      icon: 'icons/craftycorn.jpg',
      treat: '🍪',
      candyStart: { x: 215, y: 135 },
      critterPos: { x: 615, y: 435 },
      ropes: [{ x: 215, y: 48, len: 88 }],
      stars: [
        { x: 215, y: 235 },
        { x: 425, y: 310 },
        { x: 605, y: 340 }
      ],
      bubbles: [],
      bouncers: [],
      blowers: [{ x: 105, y: 235, dirX: 1, dirY: 0 }],
      catchPins: [{ x: 425, y: 175, r: 65, len: 135, caught: false }]
    },
    {
      id: 7,
      icon: 'icons/kickin.jpg',
      treat: '🧇',
      candyStart: { x: 195, y: 135 },
      critterPos: { x: 645, y: 435 },
      ropes: [{ x: 195, y: 48, len: 88 }],
      stars: [
        { x: 195, y: 245 },
        { x: 415, y: 215 },
        { x: 615, y: 315 }
      ],
      bubbles: [],
      bouncers: [
        { x: 205, y: 375, vx: 5.2, vy: -9.2 },
        { x: 435, y: 375, vx: 5.2, vy: -8.5 }
      ],
      blowers: [],
      catchPins: []
    },
    {
      id: 8,
      icon: 'icons/catnap.jpg',
      treat: '🍬',
      candyStart: { x: 250, y: 145 },
      critterPos: { x: 585, y: 215 },
      ropes: [
        { x: 165, y: 50, len: 130 },
        { x: 355, y: 50, len: 135 }
      ],
      stars: [
        { x: 265, y: 245 },
        { x: 425, y: 315 },
        { x: 545, y: 135 }
      ],
      bubbles: [{ x: 435, y: 385 }],
      bouncers: [{ x: 265, y: 385, vx: 4.8, vy: -6.5 }],
      blowers: [{ x: 340, y: 140, dirX: 1, dirY: 0 }],
      catchPins: []
    }
  ];

  // Web Audio Synthesizer for Joyful Snip, Pop, Boing, Star Chime & Nom-Nom
  class SoundEngine {
    constructor() {
      this.enabled = true;
      this.ctx = null;
    }

    ensureCtx() {
      if (!this.enabled) return null;
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return this.ctx;
    }

    playSnip() {
      const ctx = this.ensureCtx();
      if (!ctx || ctx.state !== 'running') return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(620, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(190, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.14, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.085);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    }

    playPop() {
      const ctx = this.ensureCtx();
      if (!ctx || ctx.state !== 'running') return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + 0.07);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.075);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    }

    playBoing() {
      const ctx = this.ensureCtx();
      if (!ctx || ctx.state !== 'running') return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(540, ctx.currentTime + 0.16);
      gain.gain.setValueAtTime(0.16, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.17);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.18);
    }

    playStar(idx = 0) {
      const ctx = this.ensureCtx();
      if (!ctx || ctx.state !== 'running') return;
      const freqs = [587.33, 783.99, 1046.5];
      const base = freqs[idx % freqs.length];
      const t = ctx.currentTime;
      [base, base * 1.25].forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, t + i * 0.06);
        gain.gain.setValueAtTime(0.15, t + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.06 + 0.14);
        osc.connect(gain).connect(ctx.destination);
        osc.start(t + i * 0.06);
        osc.stop(t + i * 0.06 + 0.15);
      });
    }

    playChompWin() {
      const ctx = this.ensureCtx();
      if (!ctx || ctx.state !== 'running') return;
      const notes = [523.25, 659.25, 783.99, 1046.5];
      const t = ctx.currentTime;
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t + i * 0.1);
        gain.gain.setValueAtTime(0.16, t + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.1 + 0.26);
        osc.connect(gain).connect(ctx.destination);
        osc.start(t + i * 0.1);
        osc.stop(t + i * 0.1 + 0.28);
      });
    }
  }

  const sfx = new SoundEngine();

  // Preload Critter Portraits
  const critterImages = {};
  LEVELS.forEach(lvl => {
    const img = new Image();
    img.src = lvl.icon;
    critterImages[lvl.id] = img;
  });

  // Main State
  const state = {
    currentLevelIdx: 0,
    candy: {
      x: 410,
      y: 150,
      vx: 0,
      vy: 0,
      r: 26,
      inBubble: false,
      eaten: false,
      autoFly: false
    },
    critter: {
      x: 410,
      y: 440,
      r: 44,
      mouthOpen: false,
      chompTimer: 0
    },
    ropes: [],
    stars: [],
    bubbles: [],
    bouncers: [],
    blowers: [],
    catchPins: [],
    slashTrail: [],
    sparkles: [],
    hasCutAnyRope: false,
    levelWon: false,
    progressByLevel: JSON.parse(localStorage.getItem('critters_candy_progress_v1') || '{}'),
    isPointerDown: false,
    lastPointer: null,
    frameTick: 0
  };

  // DOM References
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const levelNavBar = document.getElementById('levelNavBar');
  const sideCritterImg = document.getElementById('sideCritterImg');
  const critterMoodBadge = document.getElementById('critterMoodBadge');
  const hudTreatIcon = document.getElementById('hudTreatIcon');
  const hudMouthEmoji = document.getElementById('hudMouthEmoji');
  const floatingToast = document.getElementById('floatingToast');

  let toastTimer = null;
  function showToast(emojiMsg, duration = 1400) {
    floatingToast.textContent = emojiMsg;
    floatingToast.classList.remove('hidden');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      floatingToast.classList.add('hidden');
    }, duration);
  }

  // Build a multi-node Verlet rope between pin (ax, ay) and candy (bx, by)
  function createRope(ax, ay, bx, by, restLen) {
    const numNodes = 12;
    const nodes = [];
    for (let i = 0; i <= numNodes; i++) {
      const t = i / numNodes;
      const nx = ax + (bx - ax) * t;
      const ny = ay + (by - ay) * t;
      nodes.push({ x: nx, y: ny, oldX: nx, oldY: ny });
    }
    return {
      ax,
      ay,
      restLen,
      segLen: restLen / numNodes,
      nodes,
      cut: false,
      fadeAlpha: 1
    };
  }

  function loadLevel(idx) {
    state.currentLevelIdx = (idx + LEVELS.length) % LEVELS.length;
    const lvl = LEVELS[state.currentLevelIdx];

    state.candy = {
      x: lvl.candyStart.x,
      y: lvl.candyStart.y,
      vx: 0,
      vy: 0,
      r: 26,
      inBubble: false,
      eaten: false,
      autoFly: false
    };

    state.critter = {
      x: lvl.critterPos.x,
      y: lvl.critterPos.y,
      r: 44,
      mouthOpen: false,
      chompTimer: 0
    };

    state.ropes = lvl.ropes.map(r =>
      createRope(r.x, r.y, lvl.candyStart.x, lvl.candyStart.y, r.len)
    );

    state.stars = lvl.stars.map(s => ({
      x: s.x,
      y: s.y,
      r: 26,
      collected: false,
      bobOffset: Math.random() * Math.PI * 2
    }));

    state.bubbles = (lvl.bubbles || []).map(b => ({
      x: b.x,
      y: b.y,
      r: 30,
      used: false
    }));

    state.bouncers = (lvl.bouncers || []).map(b => ({
      x: b.x,
      y: b.y,
      r: 32,
      vx: b.vx || 5.0,
      vy: b.vy || -8.5,
      scaleAnim: 1
    }));

    state.blowers = (lvl.blowers || []).map(b => ({
      x: b.x,
      y: b.y,
      r: 28,
      dirX: b.dirX || 1,
      dirY: b.dirY || 0,
      scaleAnim: 1
    }));

    state.catchPins = (lvl.catchPins || []).map(cp => ({
      x: cp.x,
      y: cp.y,
      r: cp.r || 65,
      len: cp.len || 130,
      caught: false
    }));

    state.slashTrail = [];
    state.sparkles = [];
    state.hasCutAnyRope = false;
    state.levelWon = false;

    updateVisualHUD();
    renderLevelNav();
    document.getElementById('winModal').classList.add('hidden');
  }

  // Distance from point (px, py) to segment (x1, y1)-(x2, y2)
  function distToSegment(px, py, x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const lenSq = dx * dx + dy * dy;
    if (lenSq === 0) return Math.hypot(px - x1, py - y1);
    const t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / lenSq));
    return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
  }

  // Check if two segments intersect
  function segmentsIntersect(x1, y1, x2, y2, x3, y3, x4, y4) {
    const ccw = (ax, ay, bx, by, cx, cy) =>
      (cy - ay) * (bx - ax) > (by - ay) * (cx - ax);
    return (
      ccw(x1, y1, x3, y3, x4, y4) !== ccw(x2, y2, x3, y3, x4, y4) &&
      ccw(x1, y1, x2, y2, x3, y3) !== ccw(x1, y1, x2, y2, x4, y4)
    );
  }

  // Handle Tap or Swipe at (px, py) -> (prevX, prevY)
  function handlePointerInteraction(px, py, prevX = null, prevY = null) {
    if (state.levelWon) return;

    // 1. Check if tapping on the Candy while it's in a Bubble -> Pop the bubble!
    if (
      state.candy.inBubble &&
      Math.hypot(px - state.candy.x, py - state.candy.y) <= state.candy.r + 30
    ) {
      state.candy.inBubble = false;
      state.candy.vy = 1.5;
      sfx.playPop();
      showToast('🫧 💥');
      spawnSparkles(state.candy.x, state.candy.y, '#80deea', 10);
      return;
    }

    // 2. Check if tapping on an Air Blower (🎈💨)
    for (let i = 0; i < state.blowers.length; i++) {
      const bl = state.blowers[i];
      if (Math.hypot(px - bl.x, py - bl.y) <= bl.r + 22) {
        bl.scaleAnim = 1.35;
        state.candy.vx += bl.dirX * 5.2;
        state.candy.vy += bl.dirY * 4.0 - 1.2;
        sfx.playPop();
        showToast('🎈 💨');
        spawnSparkles(bl.x + bl.dirX * 25, bl.y, '#b2ebf2', 8);
        return;
      }
    }

    // 3. Check if swiping across OR tapping near any active Rope!
    for (let r = 0; r < state.ropes.length; r++) {
      const rope = state.ropes[r];
      if (rope.cut) continue;

      let shouldCut = false;
      let cutX = px;
      let cutY = py;

      for (let i = 0; i < rope.nodes.length - 1; i++) {
        const n1 = rope.nodes[i];
        const n2 = rope.nodes[i + 1];

        // Direct tap near rope segment (forgiving 34px radius for young fingers!)
        if (distToSegment(px, py, n1.x, n1.y, n2.x, n2.y) <= 34) {
          shouldCut = true;
          cutX = (n1.x + n2.x) * 0.5;
          cutY = (n1.y + n2.y) * 0.5;
          break;
        }

        // Or swipe intersection
        if (
          prevX !== null &&
          prevY !== null &&
          segmentsIntersect(prevX, prevY, px, py, n1.x, n1.y, n2.x, n2.y)
        ) {
          shouldCut = true;
          cutX = (n1.x + n2.x) * 0.5;
          cutY = (n1.y + n2.y) * 0.5;
          break;
        }
      }

      if (shouldCut) {
        rope.cut = true;
        state.hasCutAnyRope = true;
        sfx.playSnip();
        showToast('✂️ ✨');
        spawnSparkles(cutX, cutY, '#ffd54f', 12);
      }
    }
  }

  function spawnSparkles(x, y, color, count = 10) {
    for (let i = 0; i < count; i++) {
      state.sparkles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        color,
        r: 4 + Math.random() * 3,
        life: 24
      });
    }
  }

  // Physics Step
  function stepPhysics() {
    state.frameTick++;
    if (state.levelWon) return;

    const candy = state.candy;
    const critter = state.critter;

    // Auto-Fly Magic Mode (💡 Button): Collect all stars, then fly into Critter's mouth!
    if (candy.autoFly) {
      const nextStar = state.stars.find(s => !s.collected);
      const target = nextStar || critter;
      const dx = target.x - candy.x;
      const dy = target.y - candy.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 4) {
        candy.x += (dx / dist) * 8.5;
        candy.y += (dy / dist) * 8.5;
      }
    } else {
      // Normal Gravity vs Floating Bubble
      if (candy.inBubble) {
        candy.vy -= 0.22; // Floats UP!
        candy.vy = Math.max(-3.2, candy.vy);
        // Gently drift horizontally toward Critter's X or next star above
        const targetX = critter.x;
        candy.vx += Math.sign(targetX - candy.x) * 0.06;
      } else {
        candy.vy += 0.32; // Gravity down
      }

      candy.vx *= 0.985;
      candy.vy *= 0.985;
      candy.x += candy.vx;
      candy.y += candy.vy;

      // Active Rope Constraints
      state.ropes.forEach(rope => {
        if (rope.cut) {
          rope.fadeAlpha = Math.max(0, rope.fadeAlpha - 0.04);
          return;
        }

        // Pull candy toward anchor pin if beyond restLen
        const dx = candy.x - rope.ax;
        const dy = candy.y - rope.ay;
        const dist = Math.hypot(dx, dy);
        if (dist > rope.restLen && dist > 0.001) {
          const nx = dx / dist;
          const ny = dy / dist;
          const pull = (dist - rope.restLen) * 0.45;
          candy.x -= nx * pull;
          candy.y -= ny * pull;
          candy.vx -= nx * pull * 0.65;
          candy.vy -= ny * pull * 0.65;
        }

        // Update decorative rope curve nodes
        const nLen = rope.nodes.length - 1;
        for (let i = 0; i <= nLen; i++) {
          const t = i / nLen;
          const sag = Math.sin(t * Math.PI) * Math.max(0, (rope.restLen - dist) * 0.35);
          rope.nodes[i].x = rope.ax + (candy.x - rope.ax) * t;
          rope.nodes[i].y = rope.ay + (candy.y - rope.ay) * t + sag;
        }
      });

      // Check Auto-Catch Rope Rings (⭕)
      state.catchPins.forEach(cp => {
        if (!cp.caught && Math.hypot(candy.x - cp.x, candy.y - cp.y) <= cp.r) {
          cp.caught = true;
          state.ropes.push(createRope(cp.x, cp.y, candy.x, candy.y, cp.len));
          sfx.playPop();
          showToast('⭕ 🪢');
          spawnSparkles(cp.x, cp.y, '#ffd54f', 10);
        }
      });

      // Check Floating Bubbles on Stage (🫧)
      state.bubbles.forEach(b => {
        if (!b.used && Math.hypot(candy.x - b.x, candy.y - b.y) <= b.r + candy.r * 0.6) {
          b.used = true;
          candy.inBubble = true;
          candy.vy = -2.0;
          sfx.playPop();
          showToast('🫧 ⬆️');
          spawnSparkles(b.x, b.y, '#80deea', 12);
        }
      });

      // Check Bouncy Mushroom Trampolines (🍄)
      state.bouncers.forEach(bn => {
        bn.scaleAnim += (1 - bn.scaleAnim) * 0.15;
        if (Math.hypot(candy.x - bn.x, candy.y - bn.y) <= bn.r + candy.r * 0.6) {
          bn.scaleAnim = 1.4;
          candy.inBubble = false;
          candy.vx = bn.vx;
          candy.vy = bn.vy;
          sfx.playBoing();
          showToast('🍄 💫');
          spawnSparkles(bn.x, bn.y, '#ff80ab', 12);
        }
      });

      // Auto-assist gentle puff when candy passes directly in front of an Air Blower
      state.blowers.forEach(bl => {
        bl.scaleAnim += (1 - bl.scaleAnim) * 0.15;
        const dx = candy.x - bl.x;
        const dy = candy.y - bl.y;
        if (dx > 0 && dx < 140 && Math.abs(dy) < 42) {
          candy.vx += bl.dirX * 0.28;
        }
      });

      // Kid-Proof Rainbow Cloud Cushion at Bottom & Walls (Never lose!)
      if (candy.x < 45) {
        candy.x = 45;
        candy.vx = Math.abs(candy.vx) * 0.8 + 2.0;
      } else if (candy.x > CW - 45) {
        candy.x = CW - 45;
        candy.vx = -Math.abs(candy.vx) * 0.8 - 2.0;
      }

      if (candy.y < 42) {
        candy.y = 42;
        if (candy.inBubble) {
          // Gently drift horizontally toward Critter when at ceiling
          candy.vx += Math.sign(critter.x - candy.x) * 0.25;
        } else {
          candy.vy = Math.abs(candy.vy) * 0.5;
        }
      } else if (candy.y > CH - 52) {
        // Bouncy Rainbow Cloud Cushion bounces candy back up toward Critter!
        candy.y = CH - 52;
        candy.vy = -8.2;
        candy.vx = (critter.x - candy.x) * 0.035;
        sfx.playBoing();
        showToast('☁️ 🌈');
        spawnSparkles(candy.x, CH - 35, '#80deea', 10);
      }
    }

    // Collect Stars (⭐)
    state.stars.forEach((st, idx) => {
      if (!st.collected && Math.hypot(candy.x - st.x, candy.y - st.y) <= st.r + candy.r) {
        st.collected = true;
        sfx.playStar(idx);
        showToast('⭐ ✨');
        spawnSparkles(st.x, st.y, '#ffd54f', 14);
        updateVisualHUD();
      }
    });

    // Check Distance to Hungry Critter Mouth!
    const distToCritter = Math.hypot(candy.x - critter.x, candy.y - critter.y);
    critter.mouthOpen = distToCritter < 145;

    // Gentle magnetic pull when close to open mouth so near-misses always succeed!
    if (distToCritter < 105) {
      candy.vx += (critter.x - candy.x) * 0.045;
      candy.vy += (critter.y - candy.y) * 0.045;
    }

    if (distToCritter <= 54) {
      // Eaten! Win Stage!
      candy.eaten = true;
      onLevelComplete();
    }

    // Fade slash trail & sparkles
    for (let i = state.slashTrail.length - 1; i >= 0; i--) {
      state.slashTrail[i].life--;
      if (state.slashTrail[i].life <= 0) state.slashTrail.splice(i, 1);
    }
    for (let i = state.sparkles.length - 1; i >= 0; i--) {
      const sp = state.sparkles[i];
      sp.x += sp.vx;
      sp.y += sp.vy;
      sp.life--;
      if (sp.life <= 0) state.sparkles.splice(i, 1);
    }
  }

  function onLevelComplete() {
    state.levelWon = true;
    sfx.playChompWin();
    spawnSparkles(state.critter.x, state.critter.y, '#ffd54f', 24);
    showToast('😋 🍭 🎉');

    const lvl = LEVELS[state.currentLevelIdx];
    const earnedStars = Math.max(1, state.stars.filter(s => s.collected).length);
    const prevBest = state.progressByLevel[lvl.id] || 0;
    state.progressByLevel[lvl.id] = Math.max(prevBest, earnedStars);
    localStorage.setItem('critters_candy_progress_v1', JSON.stringify(state.progressByLevel));

    renderLevelNav();
    updateVisualHUD();

    document.getElementById('winCritterImg').src = lvl.icon;
    document.getElementById('winTreatBadge').textContent = lvl.treat;

    const winStarsDisplay = document.getElementById('winStarsDisplay');
    winStarsDisplay.innerHTML = '';
    for (let i = 0; i < 3; i++) {
      const div = document.createElement('div');
      div.className = 'win-star-big' + (i < earnedStars ? ' earned' : '');
      div.textContent = '⭐';
      winStarsDisplay.appendChild(div);
    }

    setTimeout(() => {
      if (state.currentLevelIdx === LEVELS.length - 1) {
        showGrandFinaleModal();
      } else {
        document.getElementById('winModal').classList.remove('hidden');
      }
    }, 600);
  }

  function showGrandFinaleModal() {
    const grid = document.getElementById('finaleCrittersGrid');
    grid.innerHTML = '';
    LEVELS.forEach(lvl => {
      const stars = state.progressByLevel[lvl.id] ?? 3;
      const card = document.createElement('div');
      card.className = 'finale-critter-tile';
      card.innerHTML = `
        <img src="${lvl.icon}" alt="" />
        <span>${lvl.treat} ${'⭐'.repeat(Math.max(1, stars))}</span>
      `;
      grid.appendChild(card);
    });
    document.getElementById('finaleModal').classList.remove('hidden');
  }

  // Render Scene on Canvas (100% Pure Visual, Zero Text)
  function renderScene() {
    ctx.clearRect(0, 0, CW, CH);

    // 1. Candy Box Quilted Background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, CH);
    bgGrad.addColorStop(0, '#2a1342');
    bgGrad.addColorStop(1, '#1a0b2b');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, CW, CH);

    // Soft polka-dot candy wallpaper pattern
    ctx.fillStyle = 'rgba(255, 180, 220, 0.05)';
    for (let y = 25; y < CH; y += 45) {
      for (let x = 25; x < CW; x += 45) {
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 2. Kid-Proof Rainbow Cloud Safety Net at Bottom
    drawRainbowCloudCushion();

    // 3. Draw Auto-Catch Rope Rings (⭕)
    state.catchPins.forEach(cp => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(cp.x, cp.y, cp.r, 0, Math.PI * 2);
      ctx.strokeStyle = cp.caught ? 'rgba(255, 213, 79, 0.25)' : 'rgba(255, 213, 79, 0.55)';
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 8]);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cp.x, cp.y, 12, 0, Math.PI * 2);
      ctx.fillStyle = '#ffd54f';
      ctx.fill();
      ctx.restore();
    });

    // 4. Draw Air Blowers (🎈💨)
    state.blowers.forEach(bl => {
      ctx.save();
      ctx.translate(bl.x, bl.y);
      ctx.scale(bl.scaleAnim, bl.scaleAnim);
      ctx.beginPath();
      ctx.arc(0, 0, bl.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(38, 198, 218, 0.28)';
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#80deea';
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = '28px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🎈', -4, 0);
      ctx.font = '20px sans-serif';
      ctx.fillText('💨', 22 * bl.dirX, 0);
      ctx.restore();
    });

    // 5. Draw Bouncy Mushroom Trampolines (🍄)
    state.bouncers.forEach(bn => {
      ctx.save();
      ctx.translate(bn.x, bn.y);
      ctx.scale(bn.scaleAnim, bn.scaleAnim);
      ctx.beginPath();
      ctx.arc(0, 0, bn.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 64, 129, 0.25)';
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#ff80ab';
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = '34px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🍄', 0, 2);
      ctx.restore();
    });

    // 6. Draw Floating Magic Bubbles on Stage (🫧)
    state.bubbles.forEach(b => {
      if (b.used) return;
      const bob = Math.sin(state.frameTick * 0.07) * 4;
      ctx.save();
      ctx.translate(b.x, b.y + bob);
      ctx.beginPath();
      ctx.arc(0, 0, b.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(128, 222, 234, 0.28)';
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#b2ebf2';
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = '28px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🫧', 0, 2);
      ctx.restore();
    });

    // 7. Draw 3 Golden Stars (⭐)
    state.stars.forEach(st => {
      if (st.collected) return;
      const bob = Math.sin(state.frameTick * 0.08 + st.bobOffset) * 4;
      ctx.save();
      ctx.translate(st.x, st.y + bob);

      ctx.beginPath();
      ctx.arc(0, 0, st.r + 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 213, 79, 0.22)';
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = '36px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('⭐', 0, 2);
      ctx.restore();
    });

    // 8. Draw Hungry Smiling Critter on Candy Pedestal
    drawCritterTarget();

    // 9. Draw Ropes & Anchor Pins
    state.ropes.forEach(rope => {
      if (rope.fadeAlpha <= 0) return;
      ctx.save();
      ctx.globalAlpha = rope.fadeAlpha;

      // Anchor Pin
      ctx.beginPath();
      ctx.arc(rope.ax, rope.ay, 10, 0, Math.PI * 2);
      ctx.fillStyle = '#ffca28';
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      if (!rope.cut) {
        // Outer warm rope outline
        ctx.beginPath();
        ctx.moveTo(rope.nodes[0].x, rope.nodes[0].y);
        for (let i = 1; i < rope.nodes.length; i++) {
          ctx.lineTo(rope.nodes[i].x, rope.nodes[i].y);
        }
        ctx.strokeStyle = '#ffb74d';
        ctx.lineWidth = 7;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();

        // Inner braided core
        ctx.strokeStyle = '#fff3e0';
        ctx.lineWidth = 2.5;
        ctx.setLineDash([6, 6]);
        ctx.stroke();
      }
      ctx.restore();
    });

    // 10. Draw Swinging Candy Treat (🍭 / 🍩 / 🧁 / 🎂 / 🍦)
    if (!state.candy.eaten) {
      drawCandyTreat();
    }

    // 11. Draw Animated Finger Guide (👆✂️) for Young Kids
    if (!state.levelWon) {
      drawKidFingerGuide();
    }

    // 12. Draw Rainbow Scissor Swipe Trail
    if (state.slashTrail.length > 1) {
      ctx.save();
      for (let i = 1; i < state.slashTrail.length; i++) {
        const p0 = state.slashTrail[i - 1];
        const p1 = state.slashTrail[i];
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.strokeStyle = `rgba(255, 213, 79, ${p1.life / 14})`;
        ctx.lineWidth = (p1.life / 14) * 8;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
      ctx.restore();
    }

    // 13. Draw Sparkles
    for (let i = 0; i < state.sparkles.length; i++) {
      const sp = state.sparkles[i];
      ctx.save();
      ctx.globalAlpha = Math.max(0, sp.life / 24);
      ctx.fillStyle = sp.color;
      ctx.beginPath();
      ctx.arc(sp.x, sp.y, sp.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function drawRainbowCloudCushion() {
    ctx.save();
    const y = CH - 18;
    const grad = ctx.createLinearGradient(60, y, CW - 60, y);
    grad.addColorStop(0, 'rgba(255, 128, 171, 0.32)');
    grad.addColorStop(0.5, 'rgba(128, 222, 234, 0.32)');
    grad.addColorStop(1, 'rgba(255, 213, 79, 0.32)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(40, CH - 28, CW - 80, 20, 12);
    ctx.fill();
    ctx.restore();
  }

  function drawCritterTarget() {
    const lvl = LEVELS[state.currentLevelIdx];
    const cr = state.critter;
    const bob = Math.sin(state.frameTick * 0.08) * 3;

    ctx.save();
    ctx.translate(cr.x, cr.y + bob);

    // Pedestal cushion under Critter
    ctx.fillStyle = 'rgba(255, 64, 129, 0.38)';
    ctx.strokeStyle = '#ff80ab';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(0, 42, 52, 14, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Glowing halo when mouth is open!
    ctx.beginPath();
    ctx.arc(0, 0, cr.r + (cr.mouthOpen ? 10 : 4), 0, Math.PI * 2);
    ctx.fillStyle = cr.mouthOpen
      ? 'rgba(255, 213, 79, 0.35)'
      : 'rgba(255, 128, 171, 0.18)';
    ctx.fill();

    // Critter Circular Portrait
    const img = critterImages[lvl.id];
    if (img && img.complete) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(0, 0, cr.r, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, -cr.r, -cr.r, cr.r * 2, cr.r * 2);
      ctx.restore();
    }

    ctx.beginPath();
    ctx.arc(0, 0, cr.r, 0, Math.PI * 2);
    ctx.strokeStyle = cr.mouthOpen ? '#ffd54f' : '#ffffff';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Expression badge (😮 when candy is near, 😋 when won, 🤤 waiting)
    ctx.fillStyle = '#ffffff';
    ctx.font = '28px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const badge = state.levelWon ? '😋' : cr.mouthOpen ? '😮' : '🤤';
    ctx.fillText(badge, cr.r - 6, cr.r - 8);

    ctx.restore();
  }

  function drawCandyTreat() {
    const lvl = LEVELS[state.currentLevelIdx];
    const c = state.candy;

    ctx.save();
    ctx.translate(c.x, c.y);

    // Golden glow behind candy
    ctx.beginPath();
    ctx.arc(0, 0, c.r + 6, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 213, 79, 0.26)';
    ctx.fill();

    // Candy circle background
    ctx.beginPath();
    ctx.arc(0, 0, c.r, 0, Math.PI * 2);
    ctx.fillStyle = '#fff8e1';
    ctx.fill();
    ctx.lineWidth = 3.5;
    ctx.strokeStyle = '#ffca28';
    ctx.stroke();

    // Treat Emoji
    ctx.fillStyle = '#ffffff';
    ctx.font = '34px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(lvl.treat, 0, 2);

    // If wrapped in a Magic Bubble (🫧), draw glossy bubble sphere around treat!
    if (c.inBubble) {
      ctx.beginPath();
      ctx.arc(0, 0, c.r + 12, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(128, 222, 234, 0.35)';
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#e0f7fa';
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-10, -10, 6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.fill();
    }

    ctx.restore();
  }

  function drawKidFingerGuide() {
    // 1. If candy is inside a bubble near/above the Critter, point finger at bubble to pop it!
    if (
      state.candy.inBubble &&
      Math.abs(state.candy.x - state.critter.x) < 90 &&
      state.candy.y < state.critter.y
    ) {
      const bounce = Math.sin(state.frameTick * 0.15) * 6;
      ctx.save();
      ctx.fillStyle = '#ffffff';
      ctx.font = '36px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('👆', state.candy.x + 28, state.candy.y + 28 + bounce);
      ctx.restore();
      return;
    }

    // 2. Otherwise, before first rope cut, animate finger + scissors slicing across first uncut rope!
    if (!state.hasCutAnyRope) {
      const firstRope = state.ropes.find(r => !r.cut);
      if (firstRope) {
        const midX = (firstRope.ax + state.candy.x) * 0.5;
        const midY = (firstRope.ay + state.candy.y) * 0.5;
        const swing = Math.sin(state.frameTick * 0.1) * 38;

        ctx.save();
        ctx.strokeStyle = 'rgba(255, 213, 79, 0.75)';
        ctx.lineWidth = 4;
        ctx.setLineDash([7, 7]);
        ctx.beginPath();
        ctx.moveTo(midX - 42, midY);
        ctx.lineTo(midX + 42, midY);
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = '32px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('👆✂️', midX + swing, midY + 14);
        ctx.restore();
      }
    }
  }

  // Update Top Visual HUD & Level Bar
  function updateVisualHUD() {
    const lvl = LEVELS[state.currentLevelIdx];
    sideCritterImg.src = lvl.icon;
    hudTreatIcon.textContent = lvl.treat;

    const earnedStars = state.stars.filter(s => s.collected).length;
    for (let i = 0; i < 3; i++) {
      const slot = document.getElementById(`starSlot${i}`);
      if (slot) {
        slot.classList.toggle('collected', i < earnedStars);
      }
    }

    if (state.levelWon) {
      critterMoodBadge.textContent = '🥰';
      hudMouthEmoji.textContent = '😋';
    } else if (state.critter.mouthOpen) {
      critterMoodBadge.textContent = '😮';
      hudMouthEmoji.textContent = '😮';
    } else {
      critterMoodBadge.textContent = '🤤';
      hudMouthEmoji.textContent = '😮';
    }
  }

  function renderLevelNav() {
    levelNavBar.innerHTML = '';
    LEVELS.forEach((lvl, idx) => {
      const btn = document.createElement('button');
      const earned = state.progressByLevel[lvl.id] || 0;
      btn.className =
        'level-pill' +
        (idx === state.currentLevelIdx ? ' active' : '') +
        (earned > 0 ? ' completed' : '');
      btn.innerHTML = `
        <img src="${lvl.icon}" alt="" />
        ${earned > 0 ? `<span class="pill-stars">${'⭐'.repeat(earned)}</span>` : ''}
      `;
      btn.addEventListener('click', () => loadLevel(idx));
      levelNavBar.appendChild(btn);
    });
  }

  // Pointer Events on Canvas
  function getCanvasCoords(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: ((clientX - rect.left) / rect.width) * CW,
      y: ((clientY - rect.top) / rect.height) * CH
    };
  }

  canvas.addEventListener('pointerdown', e => {
    e.preventDefault();
    state.isPointerDown = true;
    const pt = getCanvasCoords(e);
    state.lastPointer = pt;
    state.slashTrail.push({ x: pt.x, y: pt.y, life: 14 });
    handlePointerInteraction(pt.x, pt.y, null, null);
  });

  window.addEventListener('pointermove', e => {
    if (!state.isPointerDown) return;
    const pt = getCanvasCoords(e);
    state.slashTrail.push({ x: pt.x, y: pt.y, life: 14 });
    if (state.lastPointer) {
      handlePointerInteraction(pt.x, pt.y, state.lastPointer.x, state.lastPointer.y);
    } else {
      handlePointerInteraction(pt.x, pt.y, null, null);
    }
    state.lastPointer = pt;
  });

  window.addEventListener('pointerup', () => {
    state.isPointerDown = false;
    state.lastPointer = null;
  });

  // Left Toy Dock Buttons
  document.getElementById('btnToolCut').addEventListener('click', () => {
    // Cut the first remaining rope right away as a helpful shortcut!
    const nextRope = state.ropes.find(r => !r.cut);
    if (nextRope) {
      nextRope.cut = true;
      state.hasCutAnyRope = true;
      sfx.playSnip();
      showToast('✂️ ✨');
      spawnSparkles(state.candy.x, state.candy.y, '#ffd54f', 12);
    } else {
      showToast('✂️');
    }
  });

  document.getElementById('btnBubbleWrap').addEventListener('click', () => {
    state.candy.inBubble = !state.candy.inBubble;
    if (state.candy.inBubble) {
      state.candy.vy = -2.2;
      sfx.playPop();
      showToast('🫧 ⬆️');
      spawnSparkles(state.candy.x, state.candy.y, '#80deea', 12);
    } else {
      state.candy.vy = 1.5;
      sfx.playPop();
      showToast('🫧 💥');
    }
  });

  document.getElementById('btnPuffWind').addEventListener('click', () => {
    const nextStar = state.stars.find(s => !s.collected);
    const target = nextStar || state.critter;
    const dx = target.x - state.candy.x;
    const dy = target.y - state.candy.y;
    const dist = Math.max(1, Math.hypot(dx, dy));
    state.candy.vx += (dx / dist) * 5.5;
    state.candy.vy += (dy / dist) * 4.5 - 2.0;
    sfx.playPop();
    showToast('💨 ✨');
    spawnSparkles(state.candy.x, state.candy.y, '#b2ebf2', 10);
  });

  function triggerMagicAutoFeed() {
    state.ropes.forEach(r => {
      r.cut = true;
    });
    state.hasCutAnyRope = true;
    state.candy.inBubble = false;
    state.candy.autoFly = true;
    sfx.playSnip();
    showToast('💡 ✨ 🍭');
  }

  document.getElementById('btnAutoWin').addEventListener('click', () => {
    triggerMagicAutoFeed();
  });

  document.getElementById('btnResetLevel').addEventListener('click', () => {
    loadLevel(state.currentLevelIdx);
    showToast('🔄');
  });

  document.getElementById('btnWinReplay').addEventListener('click', () => {
    loadLevel(state.currentLevelIdx);
  });

  document.getElementById('btnWinNext').addEventListener('click', () => {
    loadLevel(state.currentLevelIdx + 1);
  });

  document.getElementById('btnFinaleClose').addEventListener('click', () => {
    document.getElementById('finaleModal').classList.add('hidden');
  });

  const btnSoundToggle = document.getElementById('btnSoundToggle');
  btnSoundToggle.addEventListener('click', () => {
    sfx.enabled = !sfx.enabled;
    btnSoundToggle.textContent = sfx.enabled ? '🔊' : '🔇';
  });

  function loop() {
    stepPhysics();
    renderScene();
    requestAnimationFrame(loop);
  }

  window.__CRITTERS_CANDY__ = {
    state,
    loadLevel,
    triggerMagicAutoFeed
  };

  loadLevel(0);
  requestAnimationFrame(loop);
})();
