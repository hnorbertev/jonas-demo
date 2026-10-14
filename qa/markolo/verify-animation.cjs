const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const ts = require('typescript');
const path = require('node:path');

const source = ts.transpileModule(fs.readFileSync(path.join(__dirname, '../../src/Excavator.tsx'), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;

function run(compact, reduced) {
  let effect, nextFrame = 0, time = 0;
  const nodes = {}, events = {}, frames = new Map();
  const jsx = (_tag, props = {}) => {
    if (props.ref) {
      props.ref.current = { attrs: {}, style: {}, dataset: {}, getBoundingClientRect: () => ({ top: 76, width: 390, height: 768 }), setAttribute(key, value) { this.attrs[key] = value; } };
      nodes[props['data-joint'] || props.className] = props.ref.current;
    }
    return {};
  };
  const context = {
    exports: {},
    require: name => name === 'react' ? { useRef: () => ({ current: null }), useEffect: fn => { effect = fn; } } : { jsx, jsxs: jsx },
    matchMedia: query => ({ matches: query.includes('reduced') ? reduced : compact, addEventListener() {}, removeEventListener() {} }),
    ResizeObserver: class { observe() {} disconnect() {} },
    document: { documentElement: { scrollHeight: 5000 }, querySelectorAll: () => [], fonts: { ready: Promise.resolve() } },
    innerWidth: 390, innerHeight: 1000, scrollY: 0,
    window: { addEventListener: (name, fn) => { events[name] = fn; }, removeEventListener() {} },
    requestAnimationFrame: fn => { frames.set(++nextFrame, fn); return nextFrame; },
    cancelAnimationFrame: id => frames.delete(id),
  };
  vm.runInNewContext(source, context);
  context.exports.default();
  const cleanup = effect();
  const angles = [];
  const initialViewBox = nodes.excavator.attrs.viewBox;
  for (const scroll of [0, 2000, 4000, 0]) {
    context.scrollY = scroll;
    events.scroll();
    let count = 0;
    while (frames.size) {
      assert.ok(++count < 2000, 'Animation must settle and stop requesting frames.');
      const batch = [...frames.values()];
      frames.clear();
      batch.forEach(fn => fn(time += 16));
    }
    angles.push(Number(nodes.bucket.attrs.transform.match(/rotate\(([-.\d]+)/)[1]));
    assert.ok(nodes.bucket.attrs.transform.endsWith(' 425 535)'), 'Bucket must use its physical hinge.');
    assert.ok(nodes.arm.attrs.transform.endsWith(' 685 205)'), 'Arm must keep its own hinge.');
    assert.equal(nodes.excavator.attrs.viewBox, initialViewBox, 'Scroll must not change composition.');
    assert.equal(nodes['machine-layer'].style.top, undefined, 'Scroll must not change fixed position.');
    assert.equal(nodes['machine-layer'].dataset.ready, 'true');
  }
  cleanup();
  return angles;
}

assert.deepEqual(run(true, false), [8, 44, 80, 8]);
assert.deepEqual(run(false, false), [8, 52, 96, 8]);
for (const compact of [true, false]) {
  const pose = 8 + .28 * (compact ? 72 : 88);
  assert.deepEqual(run(compact, true), [pose, pose, pose, pose]);
}
console.log('PASS: document scroll, reverse, real bucket pivot, static reduced motion, unchanged composition, no idle animation loop.');
