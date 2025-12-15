## Speedcheck v1.0.0 

**Release Date:** *15-12-2025*

This marks the **first stable release** of **speedcheck**, a cross-platform CLI tool for checking internet speed directly from the terminal.

Built as an educational project with production-grade engineering principles, this release focuses on **portability, reliability, and clean CLI UX**.

---

### What’s Included

#### Core Features

* **Single-command speed test**

  ```bash
  speedcheck
  ```
* Measures:

  * Latency (ping)
  * Download speed
  * Upload speed
* **Continuous monitoring mode**

  ```bash
  speedcheck watch
  ```
* Optional **JSON output** for scripting and automation

---

#### Cross-Platform by Design

* Works on **macOS (Intel & Apple Silicon)**, **Linux**, and **Windows**
* No native binaries
* No platform-specific system calls
* Safe to run in **Docker, CI, and cloud environments**

---

#### Networking Implementation

* Uses **Cloudflare’s public speed test infrastructure**
* Pure HTTP-based testing
* Automatically routes to the nearest Cloudflare edge
* Avoids reliance on third-party native executables

---

#### CLI & Architecture

* Modular command-based design
* Clean separation between:

  * CLI commands
  * Core networking logic
* Easy to extend with new commands and diagnostics
* Professional help output and default command behavior

---

### Notes & Limitations

* Results are **not Ookla-certified**
* Measurements reflect **real HTTP throughput**, not theoretical link capacity
* Intended for diagnostics, learning, and developer tooling

---

### Why v1.0.0 Matters

This release establishes:

* A stable public API
* Reliable cross-platform behavior
* A clean foundation for future features

Future releases may introduce:

* Detailed diagnostics mode
* Speed history and analytics
* ASCII charts and visualizations
* Server comparison and thresholds

---

### Credits & Attribution

* **Cloudflare Speed Test Infrastructure**
  [https://speed.cloudflare.com/](https://speed.cloudflare.com)
* Built with Node.js and modern CLI tooling

---

### 📄 License

MIT License

---

**Thank you for checking out speedcheck.**
Feedback, experimentation, and contributions are welcome 🚀