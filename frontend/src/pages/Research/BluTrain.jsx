import React from 'react';

const BluTrain = () => {
  return (
    <div className="min-h-screen bg-[#f3f1e9]">
      <div className="max-w-4xl mx-auto px-6 py-12 bg-[#fffdf7]">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          BluTrain: A C++/CUDA Framework for AI Systems
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Robust, Lightweight, and Architecture-General, Built from First Principles
        </p>

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

          {/* Opening Statement */}
          <p className="text-xl font-medium text-gray-900 leading-relaxed mb-2">
            A model is only as good as the system that trains it.
          </p>
          <p className="text-xl font-medium text-gray-900 leading-relaxed mb-2">
            Throughput, memory, and numerical fidelity are systems problems.
          </p>
          <p className="text-xl font-medium text-gray-900 leading-relaxed mb-6">
            BluTrain treats them as first-class.
          </p>

          <p className="mb-6">
            Progress in deep learning is, at scale, more a matter of systems engineering than of modelling. The behaviour of a model in training — its throughput, its memory footprint, and the numerical fidelity of the result — is determined less by the architecture itself than by how that architecture is expressed on the hardware.
          </p>

          <p className="mb-6">
            To achieve absolute control over this hardware expression while abstracting away systems complexity to make modelling seamless and eliminating the need for repetitive orchestration logic, BluTrain was architected from first principles as a robust, lightweight, and architecture-general training framework in standard C++ and the core CUDA programming model.
          </p>

          <p className="mb-10">
            Every layer is implemented natively: a typed tensor module with reverse-mode autograd, a linear-algebra library, a caching allocator, a multi-mode distributed-execution module, and an MLIR-based deep-learning compiler. With every layer explicitly open to native tuning, the performance ceiling is the framework's own to raise.
          </p>

          {/* The BluTrain Architecture */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">The BluTrain Architecture</h2>

          <p className="mb-6">
            BluTrain is organized as a modular ecosystem of natively co-designed components driven by a centralized configuration. It encompasses the Distributed Training Management System (DTMS) for scaling, a zero-overhead profiler for telemetry, a core Tensor &amp; Ops module, testing utilities for numerical validation, configuration management, and a custom MLIR-based deep-learning compiler.
          </p>

          <p className="mb-6">
            The framework is deliberately layered. The Tensor &amp; Ops module provides the foundational execution environment with a reverse-mode autograd engine. BluBLAS, a custom native GEMM library, sits beneath it. The DTMS isolates parallelism strategies — data, tensor, and context — from the model definition itself, so the same model code scales transparently across configurations.
          </p>

          {/* Kernel Design */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Kernel Design and Optimization</h2>

          <p className="mb-6">
            BluTrain follows a rigorous discipline of algorithmic co-design, compile-time specialization, and roofline saturation. Template parameters eliminate runtime dispatch, allowing compute-bound kernels to saturate Tensor-Core throughput and memory-bound kernels to reach near-peak DRAM bandwidth.
          </p>

          <p className="mb-6">
            This results in kernels that are tuned not just for a target architecture, but for the specific shape and dtype combinations they will encounter at runtime. There is no abstraction tax for being general — generality is resolved at compile time, not at execution.
          </p>

          {/* Distributed Execution */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Distributed Execution</h2>

          <p className="mb-6">
            The DTMS isolates parallelism strategies from the model definition. It uses asynchronous, pipelined data-flow models and dual-stream communication overlap protocols to hide collective communication latency behind computation, ensuring near-linear scaling.
          </p>

          <p className="mb-6">
            Communication and computation streams run concurrently on dedicated CUDA streams. Gradient all-reduces, parameter broadcasts, and activation exchanges are scheduled so that the GPU is never idle waiting on the interconnect.
          </p>

          {/* Implementation */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Implementation</h2>

          <p className="mb-6">
            BluTrain is a vertically integrated runtime. Key infrastructure includes <strong>BluBLAS</strong> — a native GEMM library — global horizontal tensor fusion to collapse optimizer updates, a deterministic self-tuning caching allocator to eliminate fragmentation, and an asynchronous data loader using pinned host buffers.
          </p>

          <p className="mb-6">
            The caching allocator uses a block-pool memory manager whose pool sizes are tuned automatically against the model's allocation traces. Fragmentation is bounded and deterministic across runs, which is essential for both reproducibility and for fitting larger models into the same VRAM envelope.
          </p>

          {/* Evaluation */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Evaluation</h2>

          <p className="mb-6">
            Evaluated against PyTorch using a 124M-parameter GPT-2 baseline in FP32 on an 8-GPU 6000 Ada system, BluTrain outperforms industry-standard baselines in both throughput and memory efficiency while strictly preserving numerical fidelity — converging to a marginally lower final validation loss along an effectively identical training trajectory.
          </p>

          {/* Results table-like block */}
          <div className="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-5 bg-white">
              <p className="text-sm text-gray-500 mb-1">Throughput (8× 6000 Ada)</p>
              <p className="text-2xl font-semibold text-gray-900">407K tok/s</p>
              <p className="text-xs text-gray-500 mt-1">vs PyTorch 395K tok/s</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-5 bg-white">
              <p className="text-sm text-gray-500 mb-1">Memory Footprint</p>
              <p className="text-2xl font-semibold text-gray-900">−22%</p>
              <p className="text-xs text-gray-500 mt-1">VRAM reduction</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-5 bg-white">
              <p className="text-sm text-gray-500 mb-1">Largest Model (single 48GB GPU)</p>
              <p className="text-2xl font-semibold text-gray-900">2.42B params</p>
              <p className="text-xs text-gray-500 mt-1">OOM in PyTorch</p>
            </div>
          </div>

          <p className="mb-6">
            On a single GPU in eager mode, BluTrain reaches roughly 54,600 tokens per second. The framework was primarily evaluated on NVIDIA RTX 6000 Ada and RTX 5070 GPUs, and the same code paths scale to multi-GPU configurations without modification of the model definition.
          </p>

          {/* Conclusion */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Conclusion</h2>

          <p className="mb-6">
            We detailed the architectural foundations of BluTrain, validating its structural efficiency and native execution capabilities. While ongoing optimizations will continue to refine the system's distributed scalability and computational efficiency, the underlying framework is now securely established.
          </p>

          <p className="mb-6">
            The current runtime is strictly specialized for NVIDIA microarchitectures; future iterations will evolve the deep-learning compiler into a fully hardware-agnostic backend.
          </p>

          <p className="mb-10">
            Driven by our foundational mission in applied AI research, our overarching vision is to leverage deep learning to solve complex, real-world problems. With the structural efficiency of BluTrain established, our focus shifts toward training highly competitive, large-scale models across diverse domains.
          </p>

        </div>
      </div>
    </div>
  );
};

export default BluTrain;
