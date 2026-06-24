import React from 'react';

const BluTrain = () => {
  return (
    <div className="min-h-screen bg-[#f3f1e9]">
      <div className="max-w-4xl mx-auto px-6 py-12 bg-[#fffdf7]">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          BluTrain: A C++/CUDA Framework for AI Systems
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Robust, Lightweight, and Architecture-General, Built from First Principles
        </p>

        {/* Authors */}
        <div className="mb-2 text-sm text-gray-700 leading-relaxed">
          Adhitya Charan &nbsp; Adwaid Suresh &nbsp; Anuj Kumar &nbsp; Aparna A &nbsp; Dhanakumar K
          <br />
          Dharun MS &nbsp; Dinesh G &nbsp; Goutham Kumar Reddy K &nbsp; Harshini V M &nbsp; Jenifa D &nbsp; Jona Delcy C A
          <br />
          Kathirvel S &nbsp; Killi Uma Maheswara Rao &nbsp; Kiruthik Kanna M &nbsp; Kurra Vishnu Sai &nbsp; Madhumithaa G K
          <br />
          Navin Kumar V &nbsp; Ram Charan Golla &nbsp; Revathi T &nbsp; Rishikkanth R &nbsp; Sanjay Krishna MV &nbsp; Surendra Vendra
        </div>
        <p className="text-sm text-gray-600 mb-2">BluBridge Research</p>
        <p className="text-sm text-gray-600 mb-8">contact@blubridge.ai</p>

        {/* Read the Paper Button */}
        <div className="mb-10">
          <a
            href="https://arxiv.org/pdf/2606.24780"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-[#0B1F3B] text-white px-6 py-3 rounded-md font-medium hover:bg-[#1a3a5c] transition-colors">
              Read the Paper
            </button>
          </a>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-gray-800" style={{ textAlign: "justify" }}>

          {/* Abstract */}
          <h2 className="text-2xl font-bold text-gray-900 mt-4 mb-6">Abstract</h2>
          <p className="mb-10">
            Progress in deep learning is, at scale, more a matter of systems engineering than of modelling: the behaviour of a model in training (its throughput, its memory footprint, and the numerical fidelity of the result) is determined less by the architecture itself than by how that architecture is expressed on the hardware. To achieve absolute control over this hardware expression while abstracting away systems complexity to make modelling seamless and eliminating the need for repetitive orchestration logic, BluTrain was architected from first principles as a robust, lightweight, and architecture-general training framework in standard C++ and the core CUDA programming model. Every layer is implemented natively: a typed tensor module with reverse-mode autograd, a linear-algebra library, a caching allocator, a multi mode distributed-execution module, and an MLIR-based deep-learning compiler. In formal evaluations training a 124M-parameter GPT-2 baseline in FP32 on an 8-GPU 6000 Ada system, BluTrain outperforms industry-standard baselines in both throughput (sustaining an average of 407K tokens/s versus PyTorch's 395K tokens/s) and memory efficiency (achieving up to a 22% footprint reduction), while strictly preserving numerical fidelity and converging to a marginally lower final validation loss. With every layer explicitly open to native tuning, the performance ceiling is the framework's own to raise.
          </p>

          {/* 1 Introduction */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">1&nbsp;&nbsp;Introduction</h2>
          <p className="mb-6">
            The capability of a deep-learning model is realized only through the system that trains it: the tightly coupled integration of the software framework and physical hardware. A training run spends almost all of its time in a small set of operations, such as dense matrix multiplication, normalization, attention, reductions, the loss, and the optimizer update, each executed billions of times, and the rate at which the model learns, the memory it occupies, and the numerical fidelity of the result are decided by how those operations are expressed on the hardware and coordinated across devices. Building a model is, in this sense, more an act of systems engineering than of modelling.
          </p>
          <p className="mb-6">
            BluTrain is a distributed training framework engineered directly from these constraints. To ensure that mathematical abstractions map precisely to silicon, the framework is structured as a contiguous, tightly integrated execution pipeline. From the tensor abstraction, caching allocators, and reverse-mode autograd engine down to the linear-algebra library, distributed runtime, hardware-specific operator kernels, and an MLIR-based deep-learning compiler, every component is explicitly co-designed and implemented natively with zero dependencies outside of standard C++ and the core CUDA programming model.
          </p>
          <p className="mb-4">Core engineering principles of this architecture:</p>
          <ul className="list-disc pl-8 mb-10 space-y-2">
            <li>exercise absolute control over all software layers to enforce optimal hardware expression;</li>
            <li>specialize computations statically for the specific architecture and specific hardware in use;</li>
            <li>maintain strict numerical fidelity to ensure stable convergence at scale; and</li>
            <li>abstract low-level execution to make modelling seamless, eliminating repetitive orchestration logic.</li>
          </ul>

          {/* 2 The BluTrain Architecture */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">2&nbsp;&nbsp;The BluTrain Architecture</h2>
          <p className="mb-6">
            BluTrain is organized as a highly modular ecosystem of natively co-designed components (Figure 1). A centralized configuration drives the instantiation of the model from the foundational tensor module and dictates the distributed topology.
          </p>
          <div className="my-8">
            <img
              src="/images/blutrain/figure1-architecture.png"
              alt="Figure 1: The modular architecture of the BluTrain framework"
              className="w-full rounded-lg border border-gray-200"
            />
          </div>

          {/* 2.1 */}
          <h3 className="text-xl font-bold text-gray-900 mt-10 mb-4">2.1&nbsp;&nbsp;Tensor &amp; Ops Module</h3>
          <p className="mb-6">
            The foundation of the framework is the Tensor &amp; Ops module, which serves as the primary execution environment. A Tensor encapsulates its shape, stride, and view offset configurations alongside rich runtime metadata (including datatype, device placement, version counters for in-place mutation tracking, and lazy autograd states), all backed by reference-counted memory storage and tightly coupled to an explicit operator taxonomy. Dense matrix projections are routed through BluBLAS, a native GEMM library (currently hand-tuned for Ampere SM86 and Ada Lovelace SM89 architectures). Gradient computation is handled natively within this module by an integrated reverse-mode Autograd Engine that dynamically constructs a topological computation graph via a dedicated memory arena, driving execution through specialized backward closures.
          </p>

          {/* 2.2 */}
          <h3 className="text-xl font-bold text-gray-900 mt-10 mb-4">2.2&nbsp;&nbsp;DTMS (Distributed Training Management System)</h3>
          <p className="mb-6">
            Scaling logic is structurally isolated into the DTMS, which orchestrates data, tensor and context parallelisms across the hardware topology. The choice of parallelisms emerges from the need to increase the throughput or train bigger models or enable long context training or a mix of these and is constrained by the interconnect topology. To effectively hide communication latency, the module implements communication-computation overlap by executing collective communications on a dedicated CUDA stream concurrently. This distribution is enabled by an orchestrator that manages the parallel execution of the training run and provides resilience against the faults that can be encountered during the runtime.
          </p>

          {/* 2.3 */}
          <h3 className="text-xl font-bold text-gray-900 mt-10 mb-4">2.3&nbsp;&nbsp;Profiler and Tests</h3>
          <p className="mb-6">
            To maintain absolute visibility into hardware utilization, execution telemetry is captured via a zero-overhead Profiler module. It bypasses high-level abstractions to provide exact kernel-level timings, nanosecond-resolution memory allocation tracking, and native integration with the NVIDIA Nsight profiling suite (Nsight Systems and Nsight Compute). Furthermore, a dedicated precision logger captures bit-exact cross-framework diffs (including L2 and Infinity norms) against industry-standard frameworks by aggressively dumping full forward I/O and backward gradients to disk. Validation is strictly enforced through an internal Tests module spanning multiple highly compartmentalized test suites, confirming that numeric fidelity is mathematically preserved across all architectural iterations.
          </p>

          {/* 2.4 */}
          <h3 className="text-xl font-bold text-gray-900 mt-10 mb-4">2.4&nbsp;&nbsp;Deep-Learning Compiler</h3>
          <p className="mb-10">
            To transcend the boundaries of isolated hand-written kernels and optimize the entire computational graph as a unified algebraic structure, the framework integrates a custom MLIR-based [1] deep-learning compiler acting as a just-in-time (JIT) backend. Operating entirely agnostic to high-level neural network semantics, the compiler directly ingests traced forward and backward autograd graphs as pure mathematical operations into a native MLIR dialect. This allows the system to apply compounding layers of global algebraic optimizations before progressively lowering the representation through Linalg, SCF, and Vector abstractions down to highly tuned NVPTX kernels. The compiler explicitly classifies tensor contractions by arithmetic intensity. This classification determines the optimal tensor-core (MMA) intrinsic and two-dimensional warp-grid schedule, driving aggressive shared-memory promotion, software pipelining, and multi-buffering. During execution, an LLVM ORC LLJIT engine and custom ABI adapter bind the compiled kernels directly back to live tensor storage using zero-copy memref descriptors, completely eliminating memory marshaling overhead.
          </p>

          {/* 3 Kernel Design */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">3&nbsp;&nbsp;Kernel Design and Optimization</h2>
          <p className="mb-6">
            Across the full operator and kernel surface required for a training step (enumerated in §2), each kernel is implemented natively in highly optimized C++ and CUDA, specialized strictly to the shapes, datatypes, and hardware architecture executing it. The advantage comes not from any individual kernel but from a rigorous optimization discipline applied uniformly across both host and device boundaries, governed by a core set of principles:
          </p>
          <ul className="list-disc pl-8 mb-6 space-y-4">
            <li>
              <strong>Algorithmic Co-design:</strong> Hardware-agnostic algorithmic optimizations (e.g., mathematical reformulations) and hardware-dependent optimizations (e.g., vectorization, PTX intrinsics, and shared-memory pipelining) are mutually dependent. An elegant algorithm mapped poorly to the hardware will inevitably be bottlenecked by microarchitectural constraints, while aggressive hardware-dependent optimizations applied to an inefficient algorithm merely execute redundant work faster. Maximum throughput across the entire kernel surface is achieved strictly when high-level algorithmic efficiency is perfectly coupled with low-level microarchitectural hardware optimizations.
            </li>
            <li>
              <strong>Compile-Time Specialization:</strong> Execution parameters such as datatypes, memory layouts, algorithmic blocking, and hardware microarchitectures are defined as template parameters resolved strictly at compile time. This ensures each kernel collapses into a branch-free, fully unrolled executable tailored for the exact problem geometry, entirely eliminating runtime dispatch overhead and dead branches. A unified C++ template dispatch architecture compiles directly into highly specialized native machine code. This architecture spans the host-device divide, lowering directly into native machine code for the host and specialized execution binaries for the device. This ensures uncompromising hardware expression across heterogeneous environments, seamlessly bridging diverse CPU targets with advanced GPU microarchitectures.
            </li>
            <li>
              <strong>Roofline Saturation:</strong> Every kernel is fundamentally classified by its arithmetic intensity as either compute-bound or memory-bound, and systematically engineered to saturate its corresponding architectural ceiling. Compute-bound operations (e.g., Attention, GEMM) are optimized to maximize Tensor-Core throughput via aggressive SRAM data reuse and asynchronous DRAM-to-SRAM pipelines (cp.async), effectively hiding global memory latency behind dense matrix arithmetic. Memory-bound operations (e.g., Normalization, Activations, Reductions, Optimizers) are driven to the device's absolute DRAM speed-of-light via single-pass mathematical formulations, maximum-width vectorized memory transactions (e.g., 128-bit float4 loads), and direct warp-level reductions that entirely bypass shared-memory traffic.
            </li>
            <li>
              <strong>Uncompromising Numerical Fidelity:</strong> Accumulation order, rounding modes, and precision boundaries are enforced as explicit architectural constraints. The framework strictly utilizes mathematically stable algorithms across the entire kernel surface, entirely avoiding lossy approximations. To enforce this standard, every kernel undergoes rigorous precision validation against industry-standard baselines. This uncompromising discipline ensures that mathematical correctness is never traded for execution speed, enabling the framework to precisely reproduce reference training curves (§6) rather than loosely approximate them.
            </li>
            <li>
              <strong>Maximum Silicon Utilization:</strong> Sustaining high hardware utilization requires aggressively minimizing host-side latency and eliminating artificial software barriers. By systematically stripping away high-level interpreter overheads, dynamic dispatch bottlenecks, and redundant memory allocations, the framework is engineered to keep the GPU's Streaming Multiprocessors (SMs) as actively engaged as physically possible. The ultimate objective is to translate raw computational capability directly into observable, end-to-end throughput, ensuring the hardware spends its cycles strictly on mathematical execution rather than stalling on host-side coordination.
            </li>
          </ul>
          <p className="mb-10">
            Applied uniformly, this architectural discipline translates directly to high-throughput hardware execution. Profiling telemetry confirms that the execution engine systematically approaches practical hardware limits, achieving near-optimal resource utilization across both compute-intensive and memory-bound regimes. For a comprehensive, shape-specific breakdown of performance metrics (including precise latency comparisons, bandwidth utilization, and detailed execution profiles across the primary computational kernels), refer to Appendix B.
          </p>

          {/* 4 Distributed Execution */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">4&nbsp;&nbsp;Distributed Execution</h2>
          <p className="mb-10">
            While the DTMS abstraction isolates the parallelism strategy from the model definition, realizing high-throughput distributed training requires mapping these theoretical strategies directly to the physical interconnect. This section details the execution of the multi-dimensional parallelization topology across data, tensor, and context execution. By treating distributed execution as a fundamental architectural primitive and strictly controlling the intersection of compute kernels with asynchronous collective communications, the architecture ensures near-linear scaling without exposing synchronization overhead to the critical execution path.
          </p>

          {/* 4.1 */}
          <h3 className="text-xl font-bold text-gray-900 mt-10 mb-4">4.1&nbsp;&nbsp;Data-Parallel Orchestration</h3>
          <p className="mb-6">
            The data-parallel topology overlaps communication with backward computation through an asynchronous, pipelined data-flow model [2] coordinated by lightweight GPU-side stream dependencies rather than host synchronization. Algorithm 1 formalizes this step orchestration. Execution is aggressively decoupled into local accumulation micro-steps and a single synchronizing micro-step. During gradient accumulation, forward and backward propagation execute entirely unhindered, with no distributed communication launched. Synchronization is deferred strictly to the final micro-step. Here, the autograd engine's execution graph dictates the exact emission sequence of parameter gradients; as each gradient is emitted, it is copied into its predefined 25 MB contiguous memory bucket, and completed buckets are all-reduced asynchronously, overlapping communication with the remaining backward pass.
          </p>
          <p className="mb-6">
            When a bucket saturates, an asynchronous AllReduce collective is dispatched on a secondary, high-priority CUDA stream. This mechanism interleaves dense network transfers with the remaining backward matrix multiplications. To preserve compute/communication overlap without stalling the host, the framework inserts GPU-side cross-stream dependencies using low-overhead CUDA events (cudaEventRecord + cudaStreamWaitEvent): the communication stream waits on the compute stream before each bucket's all-reduce, and the compute stream waits on the communication stream before the optimizer step. All synchronization is strictly stream-to-stream; the host thread never blocks on a barrier. Extended distributed scaling benchmarks, detailing the impact of varying bucket sizes on AllReduce latency and overall throughput, are provided in Appendix B.11.
          </p>
          <div className="my-8">
            <img
              src="/images/blutrain/algorithm1-ddp.png"
              alt="Algorithm 1: Distributed Data Parallel Training Step"
              className="w-full rounded-lg border border-gray-200"
            />
          </div>

          {/* 4.2 */}
          <h3 className="text-xl font-bold text-gray-900 mt-10 mb-4">4.2&nbsp;&nbsp;Tensor Parallelism</h3>
          <p className="mb-6">
            To push past the per-device memory limits of a single GPU, the architecture natively implements Tensor Parallelism. Dense matrix operations, such as the query-key-value (QKV) projections, attention-output matrices, MLPs, and vocabulary-scale embeddings, are systematically sharded across a defined multi-device execution mesh [3]. This sharding strictly follows symmetric column- and row-parallel schemes: column-parallel layers produce independent output shards, while row-parallel layers emit partial sums that are immediately synchronized via an AllReduce collective [3, 4]. In the backward pass, gradient reductions are mirrored symmetrically, ensuring that parameter updates remain strictly localized to their respective physical devices while activation gradients propagate upstream.
          </p>
          <p className="mb-6">
            To prevent collective communications from stalling the compute stream during tensor synchronization, the runtime implements a custom dual-stream AllReduce overlap protocol, adapting recent asynchronous tensor parallelism paradigms [5]. Computations are dynamically subdivided into discrete chunks along the token sequence dimension. Execution is asynchronously partitioned across two parallel CUDA queues: the foundational GEMM contractions are dispatched to a primary compute stream, while the resulting collective synchronizations are simultaneously offloaded to a non-blocking NCCL stream. Through precise CUDA event signaling, the AllReduce transfer for chunk i is hidden entirely behind the matrix multiplication for chunk i + 1. By explicitly scheduling non-blocking communication kernels concurrently with dense matrix operations, the runtime effectively removing collective latency from the critical path, driving near-linear scaling without sacrificing computational density. Extended tensor-parallel scaling benchmarks, detailing empirical throughput comparisons against Megatron-LM and dual-stream AllReduce overlap profiles, are provided in Appendix B.12.
          </p>

          {/* 4.3 */}
          <h3 className="text-xl font-bold text-gray-900 mt-10 mb-4">4.3&nbsp;&nbsp;Context Parallelism</h3>
          <p className="mb-6">
            To scale attention computations across sequences that exceed a single device's memory capacity, the framework implements a native Context Parallelism (CP) mechanism, adapting recent distributed sequence paradigms [6]. Context Parallelism is architecturally distinct from NVIDIA's tensor-parallel-tied Sequence Parallelism, which partitions activations only across non-tensor-parallel regions (LayerNorm, Dropout) and requires TP as a prerequisite. In contrast, CP operates as a standalone parallelism dimension: it distributes the sequence length itself across the multi-device execution mesh, independent of how the embedding dimensions are sharded. By treating the global sequence as a distributed ring of local chunks, the framework executes the core attention mechanism [7] iteratively across devices.
          </p>
          <p className="mb-6">
            To sustain this distributed operation, the architecture passes Key (K) and Value (V) shards across the GPU mesh using a Ring Rotator pipeline, mathematically analogous to Ring Attention paradigms [8]. The forward pass utilizes a single ring rotator, while the backward pass instantiates two isolated rotators: one to recompute the attention scores and a second to transfer the corresponding gradient tensors. This communication is supported by interchangeable backend collectives, including All-to-All, AllGather, and Peer-to-Peer (P2P) transfers, explicitly configured based on the underlying hardware topology.
          </p>
          <p className="mb-6">
            To maintain global mathematical equivalence during the distributed forward pass, local attention outputs are incrementally aggregated across the sequence dimension using an iterative block-wise LogSumExp (LSE) merging strategy. Specifically, as KV shards circulate through the GPU mesh, the partial attention outputs (block_out) and corresponding LSE values (block_lse) from each local iteration are combined with the running global state (out, lse) via a numerically stable sigmoid-scaled update mechanism. Furthermore, to eliminate idle device cycles induced by causal masking, the runtime employs a deterministic load-balancing scheme [9] that statically rearranges token chunks immediately at the data-loading boundary, ensuring computational parity across all GPUs globally throughout the network layers. Extended context-parallel scaling benchmarks, detailing throughput and convergence comparisons against PyTorch across the All-to-All, P2P, and AllGather rotators on the RTX 5070 and RTX 6000 Ada testbeds, are provided in Appendix B.13.
          </p>

          {/* 4.4 */}
          <h3 className="text-xl font-bold text-gray-900 mt-10 mb-4">4.4&nbsp;&nbsp;Distributed Orchestration</h3>
          <p className="mb-6">
            Sustaining a training run across days or weeks on real hardware demands an operational layer apart from the parallelism strategies above: one that spawns processes and supervises process gangs, detects failures, and recovers from them without interrupting training. At the scale and duration of modern training runs, hardware faults are not exceptional but statistically inevitable, and the established discipline for tolerating them is to checkpoint the full execution state and resume from the last uncorrupted point [10, 11].
          </p>
          <p className="mb-6">
            A dedicated distributed orchestration substrate provides this through multiple integrated components. An orchestrator daemon assigns GPUs based on NVML-discovered NUMA topology and live device health, excluding any GPU flagged as degraded or unavailable, and seeds each gang's environment with a pre-computed NCCL unique identifier and a private per-job Store, collapsing the multi-rank rendezvous to a single deterministic phase. A launcher forks the process gang with precise NUMA pinning, drains each rank's stdout and stderr into Promtail-watched log files, and broadcasts a NCCL abort signal through the per-job store on teardown, guaranteeing clean collective shutdown on every exit path. A sentinel aggregates telemetry from NVML, DCGM, node_exporter, and a BMC Redfish poller, capturing GPU temperature, ECC single and double-bit error deltas, XID event codes, throttle reason bitmasks, NVLink and PCIe bandwidth, CPU RAPL power, NIC error rates, PSU output etc., while tracking a per-rank heartbeat clock over the per-job store.
          </p>
          <p className="mb-6">
            An analytical layer runs trend analysis on temperature, ECC counters etc., to find patterns surfacing predictive faults before the hardware crosses into hard failure, an approach consistent with large-scale empirical studies of GPU failure signatures [11, 12]. A fault engine classifies every incident against a taxonomy spanning GPU hardware (XID events, NVLink fabric faults, NCCL collective hangs and timeouts, GPU and host OOM, checkpoint corruption and truncation, framework and driver crashes, OS-level process kills, and per-rank straggler divergence) and drives a persisted recovery state machine through gang kill, VRAM drain, UVM reload or full GPU reset, and job requeue from the last checkpoint.
          </p>
          <p className="mb-10">
            The full recovery history is committed to structured logs, Prometheus metrics, and OTLP traces under a stable trace identifier shared across every attempt. The result is a training infrastructure that, in line with the resilience practices of large-scale training systems [10], renders the dominant failure modes of long-running multi-GPU training operationally invisible: a run that encounters an ECC double-bit error, a hung collective, a thermal excursion, an OOM kill, or a partial gang exit emerges from recovery at its last uncorrupted checkpoint, the training loop completing despite the operational issues encountered. Checkpoint save and load latency benchmarks for this subsystem, including the asynchronous staging path, are provided in Appendix B.14.
          </p>

          {/* 5 Implementation */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">5&nbsp;&nbsp;Implementation</h2>
          <p className="mb-6">
            The architectural constraints of the framework are sustained by a vertically integrated, native runtime environment. The system explicitly eschews high-level framework dependencies in favor of purpose-built, custom infrastructure components designed to maximize continuous hardware utilization.
          </p>
          <p className="mb-6">
            <strong>Native GEMM Library:</strong> Dense matrix multiplication is served exclusively by BluBLAS [14], a custom, fully specialized GEMM library written in explicit PTX and CUDA C++. It acts as the foundational compute engine for all dense tensor contractions within the framework, specifically the query-key-value (QKV), attention-output, and MLP projections across all forward and backward execution layouts. Operating directly at the instruction level, the library implements advanced memory-system co-design to ensure continuous L2 cache residency and maximum Streaming Multiprocessor (SM) occupancy, even on highly irregular, low-parallelism gradient shapes. A detailed analysis of its microarchitectural optimizations and complete performance benchmarks are presented in its dedicated technical report.
          </p>
          <p className="mb-6">
            <strong>Horizontal Tensor Fusion:</strong> To eliminate the host-side overhead typically associated with massive parameter updates, the runtime implements a global multi-tensor horizontal fusion strategy. A single optimizer execution explicitly collapses hundreds of discrete tensor updates into a unified kernel launch. Through an advanced chunk-based load-balancing scheduler, workloads are distributed evenly across the hardware regardless of irregular tensor boundaries. This strategy ensures that all streaming multiprocessors remain saturated without tail-effect stalling, eliminating launch overhead and driving memory-bound operations to nearly 90% of the physical DRAM bandwidth limit.
          </p>
          <p className="mb-6">
            <strong>Custom Caching Allocator:</strong> Device memory is managed by a deterministic, self-tuning block-pool allocator engineered for the cyclic memory lifecycles of deep learning. To eliminate internal fragmentation, the allocator bypasses rigid size classes. Instead, it profiles tensor allocation frequencies and historical wasted bytes during the initial forward-backward pass, deriving an optimal alignment configuration dynamically tailored to the active computational graph. Additionally, the runtime executes a targeted cache flush following the 0th step to clear anomalous initialization overhead. This isolates temporary startup buffers from the steady-state memory pool, explicitly releasing the reclaimed device memory back to the CUDA driver.
          </p>
          <p className="mb-6">
            <strong>Data Loader:</strong> The ingestion pipeline is architected to overlap data movement with computation rather than serializing them (Algorithm 2). Token shards are memory-mapped and indexed by a rank-strided cursor, enabling distributed workers to partition the corpus without inter-process coordination. To keep host-to-device (H2D) transfer off the critical path, the loader stages each batch through page-locked (pinned) host buffers and issues an asynchronous cudaMemcpyAsync on a dedicated copy stream, so the next batch is prefetched into device memory while the current batch is being computed. Cross-stream ordering is enforced with CUDA events: one signals when a batch's H2D copy has landed before the compute stream reads it, and a second prevents the copy stream from overwriting a buffer the consumer is still using. As a result, input transfer is hidden whenever per-step compute exceeds per-step transfer; if pinned allocation is unavailable, the loader falls back to a synchronous path with identical results.
          </p>
          <div className="my-8">
            <img
              src="/images/blutrain/algorithm2-batch.png"
              alt="Algorithm 2: Double-Buffered Batch Production"
              className="w-full rounded-lg border border-gray-200"
            />
          </div>
          <p className="mb-10">
            <strong>Build and execution:</strong> The entire architecture compiles into a unified, standalone binary without reliance on extensive external toolchains. Training executes strictly as a native C++ process, entirely eliminating the inherent global interpreter locks and runtime overheads associated with Python environments. High-level scripting languages are deliberately relegated strictly to offline analysis, ensuring the training loop remains a pure, unhindered execution engine.
          </p>

          {/* 6 Evaluation */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">6&nbsp;&nbsp;Evaluation</h2>
          <p className="mb-6">
            To evaluate the correctness and performance characteristics of BluTrain, we model a GPT-2 style decoder-only Transformer [15] containing 124 million parameters and compare its behavior against an equivalent implementation in PyTorch [3].
          </p>
          <p className="mb-6">
            Our evaluation focuses on the three primary metrics that matter most for a training framework: numerical fidelity (convergence quality), throughput (tokens/s), and memory (footprint). The microbenchmarks in §3 explain the end-to-end speedups that occur.
          </p>
          <div className="my-8">
            <img
              src="/images/blutrain/figure2-gpt2.png"
              alt="Figure 2: The GPT-2 decoder-only Transformer architecture"
              className="w-full rounded-lg border border-gray-200"
            />
          </div>
          <div className="my-6">
            <img
              src="/images/blutrain/table1-hyperparams.png"
              alt="Table 1: Training hyperparameters for the 124M GPT-2 run"
              className="w-full rounded-lg border border-gray-200"
            />
          </div>

          <p className="mb-10">
            <strong>Experimental Setup.</strong> The framework was evaluated by modelling two identical instances of the same 124M-parameter GPT-2 configuration as in Figure 2 and by training them under the same exact conditions as described in Table 1, only differing in the framework used to build the model. Holding architecture, initialization, data ordering, and hardware conditions identical across both isolates framework as the single independent variable. The first instance realized with BluTrain has its layer definitions, every forward and backward operator, the AdamW optimizer step [17], and the parallel distribution expressed natively through the framework. The equivalent PyTorch implementation serves as the baseline. All reported latencies are derived via median CUDA-event timing across multiple kernel invocations, with numeric correctness strictly verified against a high-precision reference to ensure that hardware acceleration does not compromise mathematical fidelity.
          </p>

          {/* 6.1 */}
          <h3 className="text-xl font-bold text-gray-900 mt-10 mb-4">6.1&nbsp;&nbsp;Numerical fidelity and convergence</h3>
          <p className="mb-6">
            The central result is that BluTrain reproduces the training trajectory rather than merely approximating it. Figure 3 overlays the validation-loss curves of the two frameworks across the full run. They are visually indistinguishable: the maximum gap between the two curves at any of the 77 logged checkpoints is below 3 × 10<sup>−3</sup>, and both descend monotonically to a final validation loss of ≈ 3.07 (BluTrain 3.0675, PyTorch 3.0695). Minimum training loss likewise matches (2.8771 vs. 2.8793). For a first-principles stack this near-exact agreement is strong evidence that the operator semantics, accumulation orders, and promotion rules are correct. This is a direct consequence of controlling the numerics end to end.
          </p>
          <div className="my-8">
            <img
              src="/images/blutrain/figure3-loss.png"
              alt="Figure 3: Training and validation loss over the full 19,073-step run"
              className="w-full rounded-lg border border-gray-200"
            />
          </div>

          {/* 6.2 */}
          <h3 className="text-xl font-bold text-gray-900 mt-10 mb-4">6.2&nbsp;&nbsp;Throughput</h3>
          <p className="mb-6">
            Across the identical 124M, 8-GPU, 19,073-step workload, BluTrain achieves an aggregate throughput of ≈406,600 tokens/s (≈ 1,313 ms/step). This outperforms the PyTorch baseline of ≈394,700 tokens/s (≈ 1,359 ms/step) by a sustained ≈3% margin. In absolute terms, this implies BluTrain processes ≈11,900 more tokens every second than PyTorch during the training runtime. This end-to-end reduction in step time is the direct mathematical product of the kernel-level optimizations. In eager mode on a single GPU, BluTrain sustains ≈54,600 tokens/s, confirming efficient hardware utilization for a dense Transformer training loop at this scale.
          </p>
          <div className="my-8">
            <img
              src="/images/blutrain/table2-throughput.png"
              alt="Table 2: End-to-end training comparison on the 124M GPT-2 run"
              className="w-full rounded-lg border border-gray-200 mb-6"
            />
            <img
              src="/images/blutrain/figure4-throughput.png"
              alt="Figure 4: Per-step throughput across the full 19,073-step run"
              className="w-full rounded-lg border border-gray-200"
            />
          </div>

          {/* 6.3 */}
          <h3 className="text-xl font-bold text-gray-900 mt-10 mb-4">6.3&nbsp;&nbsp;Memory</h3>
          <p className="mb-6">
            As demonstrated in Table 3, BluTrain consistently operates with a smaller memory footprint than PyTorch. During steady-state execution, BluTrain stabilizes at 21.48 GiB per GPU, compared to PyTorch's 27.54 GiB (default), 26.35 GiB (power-of-two allocator), and 24.38 GiB (compile mode), representing a 22% reduction in sustained VRAM for the given configuration. This footprint reduction is obtained directly from BluTrain's deterministic caching allocator through two primary mechanisms. First, the allocator strictly minimizes internal fragmentation by dynamically tuning tensor alignment based on allocation frequencies and historical wasted bytes. Second, by automatically executing a targeted cache flush following the anomalous 0th step (which incorporates validation and generation passes), BluTrain permanently returns 5–7% of allocated memory to the driver. When this identical cache-flush strategy is tested on PyTorch, its size-class heuristics immediately reacquire the released memory, resulting in a 1–3% footprint spike rather than a reduction. This fundamental allocator difference yields strictly more VRAM headroom for scaling batch sizes on equivalent hardware.
          </p>
          <div className="my-8">
            <img
              src="/images/blutrain/table3-memory.png"
              alt="Table 3: GPU memory (GiB) during the 124M run"
              className="w-full rounded-lg border border-gray-200"
            />
          </div>

          {/* 6.4 */}
          <h3 className="text-xl font-bold text-gray-900 mt-10 mb-4">6.4&nbsp;&nbsp;Long-context training</h3>
          <p className="mb-6">
            To leverage long-context training, which is bounded by memory rather than by compute, the context length in the existing 124M GPT-2 configuration was increased from 1024 to 16,384 while the batch size was reduced from 16 to 2, as listed in Table 4. On a single RTX 6000 Ada (48 GiB), BluTrain reaches a peak footprint of 40.4 GiB against PyTorch's 47.8 GiB, a 15% footprint reduction at the identical model, batch, sequence length, and precision, and it does so at a higher throughput of 17,784 versus 14,849 tokens/s. PyTorch runs at 99.6% occupancy with roughly 0.2 GiB of headroom, leaving it one allocator-fragmentation spike away from an out-of-memory failure, whereas BluTrain retains a 7.6 GiB reserve on the same card while running faster. It converts directly into reachable sequence length. Modelling the same configuration would demand recomputations at throughput cost, smaller micro-batches that add gradient-accumulation steps and overhead, or sharding the model across multiple GPUs. BluTrain instead fits natively on one device and keeps full single-GPU throughput. Training at 99.6% of VRAM is fragile, turning the training prone to mid-run out-of-memory crashes caused by allocator fragmentation and transient spikes, and a multi-gibibyte reserve keeps runs stable.
          </p>
          <div className="my-8">
            <img
              src="/images/blutrain/table4-longcontext.png"
              alt="Table 4: Long-context training of the 124M GPT-2 on a single RTX 6000 Ada"
              className="w-full rounded-lg border border-gray-200"
            />
          </div>

          {/* 6.5 */}
          <h3 className="text-xl font-bold text-gray-900 mt-10 mb-4">6.5&nbsp;&nbsp;Largest trainable parameter model</h3>
          <p className="mb-6">
            The configuration in Table 5 specifies a 2.42-billion-parameter GPT-2-style model. On a single RTX 6000 Ada (48 GiB), neither PyTorch eager mode nor PyTorch compile mode can fit and train this model, both terminating with an out-of-memory failure. As reported in Table 6, BluTrain trains the identical model on the same single chip in eager mode, reaching a peak footprint of 46.9 GiB and sustaining a throughput of 13.6K tokens/s. This establishes a larger trainable-parameter ceiling on fixed hardware. The same 48 GiB device that cannot admit the model under PyTorch trains it natively under BluTrain, without recourse to model parallelism, offloading, or activation checkpointing.
          </p>
          <div className="my-8">
            <img
              src="/images/blutrain/tables5-6-largest.png"
              alt="Table 5 and Table 6: Largest trainable model configuration and results"
              className="w-full rounded-lg border border-gray-200"
            />
          </div>

          {/* 7 Related Work */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">7&nbsp;&nbsp;Related Work</h2>
          <p className="mb-6">
            BluTrain sits at the intersection of deep-learning programming models, distributed-execution systems, and low-level kernel optimization. Its architectural philosophy mirrors the custom, internal execution stacks deployed at frontier AI research labs, rather than generic open-source ecosystems.
          </p>
          <p className="mb-6">
            <strong>Deep Learning Frameworks:</strong> General-purpose frameworks such as PyTorch [3, 18] and TensorFlow [19] prioritize user flexibility and rapid prototyping. To achieve this, they rely heavily on dynamic computational graphs, Python runtimes, and JIT tracing mechanisms (e.g., TorchDynamo [20]). While versatile, these abstractions inherently decouple the user-facing tensor logic from the backend hardware. Even though the underlying kernels execute in C++ or CUDA, the host-side Python interpreter must continuously acquire the Global Interpreter Lock (GIL) to dispatch operations and manage object reference counts. For high-speed GPU execution, this dispatch cycle often becomes a bottleneck, causing the GPU to starve while waiting for Python to issue the next command. In contrast, BluTrain explicitly eschews Python-level flexibility in favor of compile-time specialization. By operating as a fully native, statically linked C++ runtime, BluTrain completely bypasses these host-side bottlenecks to enforce absolute execution determinism.
          </p>
          <p className="mb-6">
            <strong>Distributed Scale and Parallelism:</strong> Distributing the training of large neural networks has yielded a family of complementary parallelism strategies, each addressing a distinct resource bottleneck. Data parallelism is the most established: Horovod [21] and PyTorch DistributedDataParallel [2] replicate the model across workers and synchronize gradients through all-reduce, with the latter overlapping communication with the backward pass via bucketed gradient reductions. Because full replication leaves model state larger than device memory, sharded data-parallel approaches (ZeRO/DeepSpeed [22, 23, 24, 25] and FSDP [13]) instead partition optimizer states, gradients, and parameters across data-parallel ranks. Orthogonally, tensor (intra-layer) parallelism, introduced in Mesh-TensorFlow [26] and Megatron-LM [4], splits individual weight matrices across devices to relieve per-layer memory and compute. The growth of context windows has more recently motivated context (sequence) parallelism, which shards the sequence dimension; Megatron sequence parallelism, Ring Attention [8], and DeepSpeed-Ulysses [27] differ chiefly in how activations are exchanged to compute attention over a partitioned sequence. A substantial body of work further composes these axes into combined multi-dimensional schemes for extreme scale, typically tightly coupled to a particular model implementation. In contrast, DTMS exposes data, tensor, and context parallelism as independent strategies decoupled from the model definition, so that each can be selected according to the workload's bottleneck and the underlying network topology.
          </p>
          <p className="mb-6">
            <strong>Deep Learning Compilers and Memory Optimization:</strong> To circumvent the overhead inherent to high-level frameworks, the industry has heavily invested in Deep Learning (DL) compilers such as Triton [28, 29], TVM [30], and XLA [31]. These systems dynamically trace execution graphs to perform Just-In-Time (JIT) operator fusion, attempting to recover the memory bandwidth lost by fragmented kernel launches. Concurrently, memory management has become a critical bottleneck [32, 33]; static graph compiler frequently induces severe memory fragmentation, forcing frameworks to rely on complex, heuristic-based caching allocators. BluTrain addresses both compute and memory from a static, holistic perspective. Computations are globally optimized and structurally fused via a native MLIR-based deep-learning compiler. Memory is actively managed by a deterministic, self-tuning block-pool allocator engineered specifically to exploit the highly predictable, cyclic memory lifecycles (forward, backward, optimize) of neural network training. By operating with fixed, pre-allocated memory arenas rather than generic size-class heuristics, BluTrain structurally eliminates allocation fragmentation at the root.
          </p>
          <p className="mb-10">
            <strong>Kernel-Level Optimization and Microarchitecture:</strong> At the absolute limit of hardware performance, maximizing Model FLOPs Utilization (MFU) demands extreme register and shared-memory locality across every computational phase. To achieve this, the industry relies heavily on generalized, black-box libraries (e.g., cuDNN, cuBLAS) or broad template frameworks (e.g., CUTLASS [34]) to execute everything from attention mechanisms to optimization steps. While these generalized toolkits offer broad hardware portability and rapid development, they inherently compromise fine-grained microarchitectural control. BluTrain explicitly rejects these intermediate abstractions across its entire stack. By engineering every operation, from the dense linear algebra engines down to the normalization and optimizer kernels, directly in raw CUDA and native PTX, the framework secures uncompromising, cycle-accurate authority over the hardware. This holistic bypass enables precise warp-level instruction issue, deterministic sub-byte accumulation, and numerically stable online reductions [35, 36] across the entire model pipeline, extracting the absolute maximum mathematical fidelity directly from the silicon.
          </p>

          {/* 8 Discussion and Limitations */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">8&nbsp;&nbsp;Discussion and Limitations</h2>
          <p className="mb-6">We are deliberate about what the evidence does and does not show.</p>
          <p className="mb-6">
            <strong>Throughput is an honest, foundational win.</strong> BluTrain is ≈ 3% faster end-to-end (∼407K vs. ∼395K tokens/s): the per-kernel wins on attention and loss do not compound into a larger margin because the remaining kernels are at parity by construction (§3). However, this robust few-percent advantage serves strictly as an initial baseline. The system removes the rigid overheads of high-level framework wrappers. The structural foundation is now validated; with direct control over every computational layer, the ultimate performance ceiling is the framework's own to raise.
          </p>
          <p className="mb-6">
            <strong>Validation is currently at GPT-2 scale.</strong> The design makes no Transformer-specific assumptions, but the end-to-end evidence here is from one model family; broader validation across architectures is future work (§9).
          </p>
          <p className="mb-6">
            <strong>Lack of systematic component ablations.</strong> While the current evaluation demonstrates the compounding end-to-end benefits of the integrated architecture, we do not currently provide a quantitative breakdown isolating the exact performance contribution of each individual subsystem. Rigorous, component-level ablations to explicitly quantify the isolated impact of every microarchitectural design decision remain pending.
          </p>
          <p className="mb-6">
            <strong>Orchestration and failure handling limitations.</strong> The fault taxonomy, while systematically comprehensive in classification, reflects principled design reasoning more than accumulated operational experience. Recovery logic for several fault classes awaits validation against the irregular, compounding failure signatures that emerge from heterogeneous GPU populations, aging silicon, and adverse datacenter conditions. Predictive fault detection thresholds likewise remain to be calibrated against per-device empirical baselines.
          </p>
          <p className="mb-10">
            <strong>Distributed scalability limitations.</strong> Current validation is scoped to a single 8-GPU node, where intercommunication pressure and rank-count-dependent contention are negligible. Characterizing the DTMS stack under multi-node topologies (where network contention, asymmetric link degradation, and correlated multi-rank failures become dominant operational realities) remains an important next step toward establishing the distributed architecture's production readiness at scale.
          </p>

          {/* 9 Conclusion and Future Work */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">9&nbsp;&nbsp;Conclusion and Future Work</h2>
          <p className="mb-6">
            In this report, we detailed the architectural foundations of BluTrain, validating its structural efficiency and native execution capabilities. While ongoing optimizations will continue to refine the system's distributed scalability and computational efficiency, the underlying framework is now securely established. Furthermore, while the current runtime is strictly specialized for NVIDIA microarchitectures, future iterations will evolve the deep-learning compiler into a fully hardware-agnostic backend. This will decouple the core execution engine from specific physical constraints, extending BluTrain's deterministic performance optimizations across diverse accelerator ecosystems.
          </p>
          <p className="mb-6">
            Concurrently, we are conducting a systematic investigation into the microarchitectural factors governing numerical precision. By empirically evaluating how varying combinations of arithmetic execution formats, fused operation ordering, and low-level accumulation strategies impact end-to-end training and validation loss, we aim to establish a fully deterministic model of hardware-level mathematical fidelity. This ongoing research will ensure that future high-throughput scaling efforts continue to yield superior convergence trajectories.
          </p>
          <p className="mb-10">
            Driven by our foundational mission in applied AI research, our overarching vision is to leverage deep learning to solve complex, real-world problems. With the structural efficiency of BluTrain established, our focus shifts toward training highly competitive, large-scale models across diverse domains. We intend to expand our research across all primary modalities: Natural Language Processing (NLP), Computer Vision, Speech, Recommender Systems, and advanced Generative Multimodal architectures. Possessing this native computational foundation equips us with the structural authority to push the boundaries of AI research and tackle these real-world challenges without compromise.
          </p>

          {/* References */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">References</h2>
          <ol className="list-decimal pl-8 mb-10 space-y-2 text-sm">
            <li>C. Lattner et al. MLIR: A Compiler Infrastructure for the End of Moore's Law. arXiv:2002.11654, 2020.</li>
            <li>S. Li et al. PyTorch Distributed: Experiences on Accelerating Data Parallel Training. VLDB, 2020.</li>
            <li>A. Paszke et al. PyTorch: An Imperative Style, High-Performance Deep Learning Library. NeurIPS, 2019.</li>
            <li>M. Shoeybi et al. Megatron-LM: Training Multi-Billion Parameter Language Models Using Model Parallelism. arXiv:1909.08053, 2019.</li>
            <li>H. He et al. Introducing Async Tensor Parallelism in PyTorch (TorchTitan). PyTorch Dev Discuss, 2024.</li>
            <li>X. Wu et al. Breaking Barriers: Training Long Context LLMs with 1M Sequence Length in PyTorch Using Context Parallel. PyTorch Dev Discuss, 2025.</li>
            <li>T. Dao et al. FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness. NeurIPS, 2022.</li>
            <li>H. Liu et al. Ring Attention with Blockwise Transformers for Near-Infinite Context. ICLR, 2024.</li>
            <li>Insujang. Introducing Context Parallelism. https://insujang.github.io/2024-09-20/introducing-context-parallelism/, 2024.</li>
            <li>D. Narayanan et al. Efficient Large-Scale Language Model Training on GPU Clusters Using Megatron-LM. SC, 2021.</li>
            <li>A. Eisenman et al. Check-N-Run: A Checkpointing System for Training Deep Learning Recommendation Models. NSDI, 2022.</li>
            <li>B. Nie et al. Characterizing Temperature, Power, and Soft-Error Behaviors in Data Center GPUs: A Field Study. 2018.</li>
            <li>Y. Zhao et al. PyTorch FSDP: Experiences on Scaling Fully Sharded Data Parallel. VLDB, 2023.</li>
            <li>BluBridge Team. BluBLAS: Hand-Tuned GEMM Kernels for Ada Lovelace Tensor Cores. BluBridge Technologies, technical report, 2026.</li>
            <li>A. Radford et al. Language Models are Unsupervised Multitask Learners. OpenAI, 2019.</li>
            <li>G. Penedo et al. The FineWeb Datasets: Decanting the Web for the Finest Text Data at Scale. arXiv:2406.17557, 2024.</li>
            <li>I. Loshchilov, F. Hutter. Decoupled Weight Decay Regularization. ICLR, 2019.</li>
            <li>A. Ansel et al. PyTorch 2: Faster Machine Learning Through Dynamic Python Bytecode Transformation and Graph Compilation. ASPLOS, 2024.</li>
            <li>M. Abadi et al. TensorFlow: A System for Large-Scale Machine Learning. OSDI, 2016.</li>
            <li>PyTorch Team. TorchDynamo. https://docs.pytorch.org/docs/2.12/user_guide/torch_compiler/torch.compiler_dynamo_overview.html, 2022.</li>
            <li>A. Sergeev, M. Del Balso. Horovod: Fast and Easy Distributed Deep Learning in TensorFlow. arXiv:1802.05799, 2018.</li>
            <li>S. Rajbhandari et al. ZeRO: Memory Optimizations Toward Training Trillion Parameter Models. SC, 2020.</li>
            <li>J. Ren et al. ZeRO-Offload: Democratizing Billion-Scale Model Training. USENIX ATC, 2021.</li>
            <li>S. Rajbhandari et al. ZeRO-Infinity: Breaking the GPU Memory Wall for Extreme Scale Deep Learning. SC, 2021.</li>
            <li>J. Rasley et al. DeepSpeed: System Optimizations Enable Training Deep Learning Models with Over 100 Billion Parameters. KDD, 2020.</li>
            <li>N. Shazeer et al. Mesh-TensorFlow: Deep Learning for Supercomputers. NeurIPS, 2018.</li>
            <li>S. Jacobs et al. DeepSpeed Ulysses: System Optimizations for Enabling Training of Extreme Long Sequence Transformer Models. arXiv:2309.14509, 2023.</li>
            <li>P. Tillet et al. Triton: An Intermediate Language and Compiler for Tiled Neural Network Computations. MAPL, 2019.</li>
            <li>P. Tillet. Introducing Triton: Open-Source GPU Programming for Neural Networks. OpenAI Blog, 2021.</li>
            <li>T. Chen et al. TVM: An Automated End-to-End Optimizing Compiler for Deep Learning. OSDI, 2018.</li>
            <li>C. Leary et al. XLA: TensorFlow, Compiled. TensorFlow Dev Summit, 2017.</li>
            <li>T. Chen et al. Training Deep Nets with Sublinear Memory Cost. arXiv:1604.06174, 2016.</li>
            <li>X. Peng et al. Capuchin: Tensor-based GPU Memory Management for Deep Learning. ASPLOS, 2020.</li>
            <li>NVIDIA. CUTLASS: Fast Linear Algebra in CUDA C++. https://github.com/NVIDIA/cutlass.</li>
            <li>M. Milakov, N. Gimelshein. Online Normalizer Calculation for Softmax. arXiv:1805.02867, 2018.</li>
            <li>B. P. Welford. Note on a Method for Calculating Corrected Sums of Squares and Products. Technometrics, 4(3):419–420, 1962. doi:10.1080/00401706.1962.10490022.</li>
          </ol>

          {/* Appendix */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Appendix</h2>
          <h3 className="text-xl font-bold text-gray-900 mt-10 mb-4">A&nbsp;&nbsp;Hardware and Benchmarking Methodology</h3>
          <ul className="list-disc pl-8 mb-10 space-y-2">
            <li>Warm-up Initialization</li>
            <li>Iteration Count</li>
            <li>Cache Eviction</li>
            <li>Telemetry</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-900 mt-10 mb-4">B&nbsp;&nbsp;Performance Benchmarks</h3>
          <p className="mb-4">Subsections B.1 to B.14, including figures for:</p>
          <ul className="list-disc pl-8 mb-10 space-y-2">
            <li>B.1 Attention Forward</li>
            <li>B.2 Attention Backward</li>
            <li>B.3 GELU Forward</li>
            <li>B.4 GELU Backward</li>
            <li>B.5 LayerNorm Forward</li>
            <li>B.6 LayerNorm Backward</li>
            <li>B.7 Sparse Cross-Entropy Loss Forward</li>
            <li>B.8 Sparse Cross-Entropy Loss Backward</li>
            <li>B.9 Reduce Sum Kernel</li>
            <li>B.10 AdamW Optimizer Kernel</li>
            <li>B.11 Distributed Data Parallel Execution</li>
            <li>B.12 Tensor Parallelism Benchmarks</li>
            <li>B.13 Context Parallelism Benchmarks</li>
            <li>B.14 Checkpointing Benchmarks</li>
          </ul>

        </div>
      </div>
    </div>
  );
};

export default BluTrain;
