# NS22-024: Brain boundary for native orchestration

The Harness is the authority for mission, task, run, and lane-lease state
transitions. PlugBrain is the authority for workspace and checkout identity,
path containment, indexed knowledge, provenance, and context packs.

PlugBrain therefore does not schedule work or decide whether a worker owns a
lane. It consumes the Harness' task and lease facts, projects them for
awareness, and rejects a filesystem mutation that lacks a current, matching
path fence. A Brain-generated local claim remains a compatibility mechanism;
the native orchestration surface must identify Harness-backed fences explicitly.

The boundary is intentionally narrow:

- Harness supplies `taskId`, checkout generation, and fence identity.
- Brain resolves a request to a registered workspace/checkout, builds a bounded
  context pack, and records the source generation/revision vector.
- Brain verifies an agent's fence at the final write boundary, before I/O.
- Brain reports the change feed since the pack's checkout generation; it never
  changes Harness mission or lane state as a side effect.

This document accompanies the O5 implementation and is deliberately a product
contract rather than a second queue or scheduler.
