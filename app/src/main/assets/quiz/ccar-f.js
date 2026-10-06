const ccar_f = {
  "title": "Claude Certified Architect - Foundations",
  "description": "Claude Certified Architect - Foundations (CCAR-F)",
  "defaultCount": 162,
  "passPercent": 70,
  "questions": [
    {
      "number": 1,
      "topic": 1,
      "type": "mcq",
      "question": "A developer asks the agent to investigate why a specific API endpoint intermittently returns 500 responses. The codebase has 200+ files and the developer doesn't know which components are involved. The agent must trace the error through routing, middleware, business logic, and database layers. What task decomposition approach would be most effective?",
      "options": [
        "Run parallel worker agents on the file system of four layers, then combine their findings to reconstruct the complete error path.",
        "Have the agent dynamically generate investigation subtasks based on what it discovers at each step, adapting its exploration plan as new information about the error path emerges.",
        "Define a fixed sequence of investigation steps upfront—grep for error handlers, then examine middleware, then check database queries, then examine middleware-woven code.",
        "Have the agent first create a comprehensive plan mapping all code paths through documented components before beginning any exploration or code reading."
      ],
      "answers": [
        "Have the agent dynamically generate investigation subtasks based on what it discovers at each step, adapting its exploration plan as new information about the error path emerges."
      ],
      "explanation": {
        "key": "<b>“The agent must trace the error through routing, middleware, business logic,”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Have the agent dynamically generate investigation subtasks based on what it”</b> <i>(trong đáp án B)</i>: gỡ lỗi là thích ứng — mỗi tệp bạn đọc sẽ thay đổi bước tiếp theo hữu ích…",
        "elimination": [
          "<b>A. Run parallel worker agents on the file system of four layers, then combine their findings to reconstruct the complete error path.</b>: Bỏ qua yêu cầu chính “The agent must trace the error through routing,”.",
          "<b>C. Define a fixed sequence of investigation steps upfront—grep for error handlers, then examine middleware, then check database queries, then examine middleware-woven code.</b>: Bỏ qua yêu cầu chính “The agent must trace the error through routing,”.",
          "<b>D. Have the agent first create a comprehensive plan mapping all code paths through documented components before beginning any exploration or code reading.</b>: Bỏ qua yêu cầu chính “The agent must trace the error through routing,”."
        ]
      }
    },
    {
      "number": 2,
      "topic": 1,
      "type": "mcq",
      "question": "Your agent needs to insert a new helper function into the middle of a 150-line utility module, between two existing functions. The Edit tool fails because its old_string parameter cannot find unique text to match – the file has repetitive docstrings, variable names, and structural patterns. What's the most reliable way to complete this insertion?",
      "options": [
        "Use Read to load the file, add the function at the appropriate location, then Write the updated file",
        "Use Edit's replace_all parameter to target a common pattern and embed the new function in the replacement text",
        "Use Edit with an extremely long old_string capturing 30+ lines of context to guarantee uniqueness",
        "Use Bash to append the function definition to the end of the file using heredoc syntax"
      ],
      "answers": [
        "Use Read to load the file, add the function at the appropriate location, then Write the updated file"
      ],
      "explanation": {
        "key": "<b>“The Edit tool fails because its old_string parameter cannot find unique”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Use Read to load the file, add the function at the”</b> <i>(trong đáp án A)</i>: Khi Edit không thể tìm được old_string duy nhất vì tệp có nhiều đoạn lặp, cách chắc chắn…",
        "elimination": [
          "<b>B. Use Edit's replace_all parameter to target a common pattern and embed the new function in the replacement text</b>: Bỏ qua yêu cầu chính “The Edit tool fails because its old_string parameter”.",
          "<b>C. Use Edit with an extremely long old_string capturing 30+ lines of context to guarantee uniqueness</b>: Bỏ qua yêu cầu chính “The Edit tool fails because its old_string parameter”.",
          "<b>D. Use Bash to append the function definition to the end of the file using heredoc syntax</b>: Bash có thể thực hiện thao tác nhưng dễ vỡ và bỏ qua contract hoặc…"
        ]
      }
    },
    {
      "number": 3,
      "topic": 1,
      "type": "mcq",
      "question": "An engineer used Claude Code yesterday to investigate authentication flows in a legacy monolith, building up significant context over a 2-hour session. Today she wants to continue that specific investigation. She's worked on three other codebases since then and knows the session was named \"auth-deep-dive\". How should she resume?",
      "options": [
        "Use --resume auth-deep-dive to load that specific session by name",
        "Use --session-id with the UUID from yesterday's session transcript file",
        "Use --continue to pick up where the most recent conversation left off",
        "Start fresh and re-read the same files"
      ],
      "answers": [
        "Use --resume auth-deep-dive to load that specific session by name"
      ],
      "explanation": {
        "key": "<b>“An engineer used Claude Code yesterday to investigate authentication flows in”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Use --resume auth-deep-dive to load that specific session by name”</b> <i>(trong đáp án A)</i>: --resume cho phép tiếp tục một phiên cụ thể theo tên.",
        "elimination": [
          "<b>B. Use --session-id with the UUID from yesterday's session transcript file</b>: Bỏ qua yêu cầu chính “An engineer used Claude Code yesterday to investigate”.",
          "<b>C. Use --continue to pick up where the most recent conversation left off</b>: Bỏ qua yêu cầu chính “An engineer used Claude Code yesterday to investigate”.",
          "<b>D. Start fresh and re-read the same files</b>: Bắt đầu lại làm mất phần context đã tích lũy và buộc hệ thống lặp…"
        ]
      }
    },
    {
      "number": 4,
      "topic": 1,
      "type": "mcq",
      "question": "An engineer's exploration subagent spent 30 minutes analyzing a legacy payment system, reading 47 files and documenting data flows. The session was interrupted when the engineer's connection dropped. While away, a teammate merged a PR that renamed two utility functions. The engineer wants to continue the same exploration. What's the most effective approach?",
      "options": [
        "Resume the subagent from its previous transcript without mentioning the changes–the architecture understanding remains valid.",
        "Resume the subagent from its previous transcript and inform it about the renamed functions.",
        "Launch a fresh subagent and include the prior transcript in the initial prompt for context.",
        "Launch a fresh subagent with a summary of prior findings."
      ],
      "answers": [
        "Resume the subagent from its previous transcript and inform it about the renamed functions."
      ],
      "explanation": {
        "key": "<b>“The engineer wants to continue the same exploration.”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Resume the subagent from its previous transcript and inform it about”</b> <i>(trong đáp án B)</i>: Tiếp tục từ bản ghi cũ với thông tin cập nhật về các chức năng đã được đổi…",
        "elimination": [
          "<b>A. Resume the subagent from its previous transcript without mentioning the changes–the architecture understanding remains valid.</b>: Phương án này tiếp tục dựa trên trạng thái cũ mà không cập nhật thay…",
          "<b>C. Launch a fresh subagent and include the prior transcript in the initial prompt for context.</b>: Bắt đầu lại làm mất phần context đã tích lũy và buộc hệ thống lặp…",
          "<b>D. Launch a fresh subagent with a summary of prior findings.</b>: Bắt đầu lại làm mất phần context đã tích lũy và buộc hệ thống lặp…"
        ]
      }
    },
    {
      "number": 5,
      "topic": 1,
      "type": "mcq",
      "question": "Your agent has spent 25 minutes exploring a game engine's rendering subsystem–reading shader code, buffer management, and frame synchronization logic. An engineer now asks it to understand how the physics engine integrates with rendering for collision debug overlays. You notice recent responses reference \"typical rendering patterns\" rather than the specific VulkanPipeline and FrameGraph classes it discovered earlier. What's the most effective approach?",
      "options": [
        "Use /clear to reset context completely, then start fresh with physics exploration using file paths from the project's CLAUDE.md.",
        "Summarize key rendering findings, then spawn a sub-agent for physics exploration with that summary in its initial context.",
        "Spawn a sub-agent to explore physics independently, then manually synthesize its findings with the rendering knowledge accumulated in the main conversation.",
        "Continue in the current context with more targeted prompts referencing the specific classes by name."
      ],
      "answers": [
        "Summarize key rendering findings, then spawn a sub-agent for physics exploration with that summary in its initial context."
      ],
      "explanation": {
        "key": "<b>“You notice recent responses reference \"typical rendering patterns\" rather than the”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Summarize key rendering findings, then spawn a sub-agent for physics exploration”</b> <i>(trong đáp án B)</i>: Phản hồi chung chung về \"mẫu kết xuất điển hình\" báo hiệu sự suy giảm bối cảnh sau…",
        "elimination": [
          "<b>A. Use /clear to reset context completely, then start fresh with physics exploration using file paths from the project's CLAUDE.md.</b>: Bắt đầu lại làm mất phần context đã tích lũy và buộc hệ thống lặp…",
          "<b>C. Spawn a sub-agent to explore physics independently, then manually synthesize its findings with the rendering knowledge accumulated in the main conversation.</b>: Bỏ qua yêu cầu chính “You notice recent responses reference \"typical rendering patterns\"”.",
          "<b>D. Continue in the current context with more targeted prompts referencing the specific classes by name.</b>: Bỏ qua yêu cầu chính “You notice recent responses reference \"typical rendering patterns\"”."
        ]
      }
    },
    {
      "number": 6,
      "topic": 1,
      "type": "mcq",
      "question": "An engineer asks the agent to find all callers of a function before removing it. The function is defined in a core library but is also exposed through wrapper modules that rename the function for domain-specific use (e.g., calculateTax in the library becomes computeOrderTax in the orders module). What exploration strategy will most reliably identify all callers?",
      "options": [
        "Read the library and wrapper modules to identify all exposed names for the function, then Grep for each name across the codebase.",
        "Use Grep to search for the function's original name across the codebase.",
        "Use Grep to find all files that import from the library or wrapper modules, then read each file to check whether it uses the function.",
        "Search for the function name in project documentation to understand intended usage patterns and navigate to documented integration points."
      ],
      "answers": [
        "Read the library and wrapper modules to identify all exposed names for the function, then Grep for each name across the codebase."
      ],
      "explanation": {
        "key": "<b>“The function is defined in a core library but is also”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Read the library and wrapper modules to identify all exposed names”</b> <i>(trong đáp án A)</i>: Vì hàm được hiển thị thông qua nhiều mô-đun trình bao bọc với các tên khác nhau nên…",
        "elimination": [
          "<b>B. Use Grep to search for the function's original name across the codebase.</b>: Tìm kiếm văn bản đơn thuần chỉ cho biết nơi một chuỗi xuất hiện; nó…",
          "<b>C. Use Grep to find all files that import from the library or wrapper modules, then read each file to check whether it uses the function.</b>: Tìm kiếm văn bản đơn thuần chỉ cho biết nơi một chuỗi xuất hiện; nó…",
          "<b>D. Search for the function name in project documentation to understand intended usage patterns and navigate to documented integration points.</b>: Tìm kiếm văn bản đơn thuần chỉ cho biết nơi một chuỗi xuất hiện; nó…"
        ]
      }
    },
    {
      "number": 7,
      "topic": 1,
      "type": "mcq",
      "question": "During testing, you observe that in extended exploration sessions (30+ minutes), the agent starts giving inconsistent answers about code structure it discussed earlier. Engineers report having to repeat context about modules they've already explored. What's the most effective approach to address this?",
      "options": [
        "Implement automatic context clearing every 15 minutes to ensure the agent starts with fresh, uncontaminated context.",
        "Switch to a higher-capacity model tier to provide more context window space for accumulated exploration data.",
        "Have the agent maintain a scratchpad file that records key findings, referencing it for subsequent questions.",
        "Create summaries of all source files before exploration begins, loading only these compressed representations into context."
      ],
      "answers": [
        "Have the agent maintain a scratchpad file that records key findings, referencing it for subsequent questions."
      ],
      "explanation": {
        "key": "<b>“Engineers report having to repeat context about modules they've already explored.”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Have the agent maintain a scratchpad file that records key findings,”</b> <i>(trong đáp án C)</i>: context window bị giới hạn và sau hơn 30 phút, thông tin cũ sẽ bị đẩy ra ngoài.",
        "elimination": [
          "<b>A. Implement automatic context clearing every 15 minutes to ensure the agent starts with fresh, uncontaminated context.</b>: Bỏ qua yêu cầu chính “Engineers report having to repeat context about modules”.",
          "<b>B. Switch to a higher-capacity model tier to provide more context window space for accumulated exploration data.</b>: Đổi model có thể cải thiện chất lượng chung nhưng không xử lý nguyên nhân…",
          "<b>D. Create summaries of all source files before exploration begins, loading only these compressed representations into context.</b>: Bash có thể thực hiện thao tác nhưng dễ vỡ và bỏ qua contract hoặc…"
        ]
      }
    },
    {
      "number": 8,
      "topic": 1,
      "type": "mcq",
      "question": "After adding an MCP server with specialized code refactoring tools (extract_function, rename_variable, inline_function), you notice the agent still uses basic text manipulation via Write and Bash sed commands for refactoring tasks. The MCP server is connected and working. Examining the configuration, you find each MCP tool has a minimal description like \"extract_function: extracts a function from code.\" What's the most effective way to improve adoption of the MCP refactoring tools?",
      "options": [
        "Accept this as expected behavior since simpler tools like sed are more predictable than specialized refactoring tools.",
        "Remove the Write tool from the agent's configuration for refactoring sessions so it must use the MCP tools for code modifications.",
        "Enhance the MCP tool descriptions to explain when each tool is preferable to text manipulation and clarify expected inputs and outputs.",
        "Implement a request classifier that detects refactoring intent and automatically routes those requests to the MCP server before the agent processes them."
      ],
      "answers": [
        "Enhance the MCP tool descriptions to explain when each tool is preferable to text manipulation and clarify expected inputs and outputs."
      ],
      "explanation": {
        "key": "<b>“After adding an MCP server with specialized code refactoring tools (extract_function,”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Enhance the MCP tool descriptions to explain when each tool is”</b> <i>(trong đáp án C)</i>: Việc lựa chọn công cụ được quyết định bởi những mô tả mà Claude nhìn thấy.",
        "elimination": [
          "<b>A. Accept this as expected behavior since simpler tools like sed are more predictable than specialized refactoring tools.</b>: Bash có thể thực hiện thao tác nhưng dễ vỡ và bỏ qua contract hoặc…",
          "<b>B. Remove the Write tool from the agent's configuration for refactoring sessions so it must use the MCP tools for code modifications.</b>: Bỏ qua yêu cầu chính “After adding an MCP server with specialized code”.",
          "<b>D. Implement a request classifier that detects refactoring intent and automatically routes those requests to the MCP server before the agent processes them.</b>: Bỏ qua yêu cầu chính “After adding an MCP server with specialized code”."
        ]
      }
    },
    {
      "number": 9,
      "topic": 1,
      "type": "mcq",
      "question": "An engineer asks the agent to investigate error handling in a legacy payment processing module spanning 15 files. After reading the first 8 files, the agent's responses are becoming noticeably less accurate—it's forgetting previously discovered code patterns and hasn't yet located all test files or traced the complete data flow. What's the most effective approach to complete this investigation?",
      "options": [
        "Use Grep to search for specific function names across remaining files, reducing the content loaded into context.",
        "Spawn a subagent to explore the remaining files, providing a summary of discovered patterns as its initial context.",
        "Document a summary of findings so far in a file, then start fresh with a new context using that summary as reference.",
        "Close the current context with /clear and start fresh, re-reading only the most critical files."
      ],
      "answers": [
        "Spawn a subagent to explore the remaining files, providing a summary of discovered patterns as its initial context."
      ],
      "explanation": {
        "key": "<b>“After reading the first 8 files, the agent's responses are becoming”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Spawn a subagent to explore the remaining files, providing a summary”</b> <i>(trong đáp án B)</i>: Khi agent mất ngữ cảnh sau khi đọc quá nhiều tệp, việc tạo ra một subagent mới với…",
        "elimination": [
          "<b>A. Use Grep to search for specific function names across remaining files, reducing the content loaded into context.</b>: Tìm kiếm văn bản đơn thuần chỉ cho biết nơi một chuỗi xuất hiện; nó…",
          "<b>C. Document a summary of findings so far in a file, then start fresh with a new context using that summary as reference.</b>: Bắt đầu lại làm mất phần context đã tích lũy và buộc hệ thống lặp…",
          "<b>D. Close the current context with /clear and start fresh, re-reading only the most critical files.</b>: Bắt đầu lại làm mất phần context đã tích lũy và buộc hệ thống lặp…"
        ]
      }
    },
    {
      "number": 10,
      "topic": 1,
      "type": "mcq",
      "question": "An engineer used the agent yesterday to analyze a legacy authentication module, identifying two distinct refactoring approaches: extracting a microservice versus refactoring in-place. Today, they want to explore both approaches in depth–having the agent propose specific code changes for each–before deciding which to implement. What's the most effective way to structure this exploration?",
      "options": [
        "Start two fresh sessions, manually providing a summary of yesterday's analysis findings to establish context.",
        "Resume yesterday's session to explore the first approach, then start a new session for the second, manually recreating the original context.",
        "Use fork_session to create two branches from yesterday's analysis, exploring one approach in each fork.",
        "Resume yesterday's session and explore both approaches sequentially within the same conversation thread."
      ],
      "answers": [
        "Use fork_session to create two branches from yesterday's analysis, exploring one approach in each fork."
      ],
      "explanation": {
        "key": "<b>“Today, they want to explore both approaches in depth–having the agent”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Use fork_session to create two branches from yesterday's analysis, exploring one”</b> <i>(trong đáp án C)</i>: fork_session cho phép tạo hai nhánh từ cùng một điểm phân tích, mỗi nhánh khám phá một cách…",
        "elimination": [
          "<b>A. Start two fresh sessions, manually providing a summary of yesterday's analysis findings to establish context.</b>: Bỏ qua yêu cầu chính “Today, they want to explore both approaches in”.",
          "<b>B. Resume yesterday's session to explore the first approach, then start a new session for the second, manually recreating the original context.</b>: Bỏ qua yêu cầu chính “Today, they want to explore both approaches in”.",
          "<b>D. Resume yesterday's session and explore both approaches sequentially within the same conversation thread.</b>: Bỏ qua yêu cầu chính “Today, they want to explore both approaches in”."
        ]
      }
    },
    {
      "number": 11,
      "topic": 1,
      "type": "mcq",
      "question": "Your agent has analyzed a complex service module–reading 23 source files, tracing request flows, and identifying error handling patterns. A developer wants to compare two testing strategies before committing to one: end-to-end tests with mocked external services vs. snapshot tests capturing expected outputs. They need to independently develop both approaches to evaluate trade-offs. How should you manage the sessions?",
      "options": [
        "Resume the analysis session with fork_session enabled, creating a separate branch for each testing strategy.",
        "Export the analysis session's key findings to a file, then create two new sessions that reference this file.",
        "Continue in the original session, developing end-to-end tests first, then snapshot tests sequentially.",
        "Start two fresh sessions, having each re-read the relevant source files before beginning."
      ],
      "answers": [
        "Resume the analysis session with fork_session enabled, creating a separate branch for each testing strategy."
      ],
      "explanation": {
        "key": "<b>“They need to independently develop both approaches to evaluate trade-offs.”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Resume the analysis session with fork_session enabled, creating a separate branch”</b> <i>(trong đáp án A)</i>: Tại sao câu trả lời đúng lại hoạt động: fork_session cho phép tạo hai nhánh từ cùng một…",
        "elimination": [
          "<b>B. Export the analysis session's key findings to a file, then create two new sessions that reference this file.</b>: Bỏ qua yêu cầu chính “They need to independently develop both approaches to”.",
          "<b>C. Continue in the original session, developing end-to-end tests first, then snapshot tests sequentially.</b>: Bỏ qua yêu cầu chính “They need to independently develop both approaches to”.",
          "<b>D. Start two fresh sessions, having each re-read the relevant source files before beginning.</b>: Bỏ qua yêu cầu chính “They need to independently develop both approaches to”."
        ]
      }
    },
    {
      "number": 12,
      "topic": 1,
      "type": "mcq",
      "question": "Your codebase exploration tool stores session IDs to allow engineers to continue investigations across work sessions. An engineer spent an hour yesterday analyzing a legacy authentication module, building context about its architecture and dependencies. They want to continue today. The session ID is valid, but version control shows 3 of the 12 files the agent previously read were modified overnight by a teammate's merge. What approach best balances efficiency and accuracy?",
      "options": [
        "Resume the session and immediately have the agent re-read all 12 previously analyzed files",
        "Start a fresh session to ensure the agent works with current codebase state without stale assumptions",
        "Resume the session and inform the agent which specific files changed for targeted re-analysis",
        "Resume the session without informing the agent about the changed files"
      ],
      "answers": [
        "Resume the session and inform the agent which specific files changed for targeted re-analysis"
      ],
      "explanation": {
        "key": "<b>“The session ID is valid, but version control shows 3 of”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Resume the session and inform the agent which specific files changed”</b> <i>(trong đáp án C)</i>: Tiếp tục phiên + thông báo các tệp đã thay đổi là cách cân bằng nhất: giữ nguyên…",
        "elimination": [
          "<b>A. Resume the session and immediately have the agent re-read all 12 previously analyzed files</b>: Cách này giữ quá nhiều dữ liệu không cần thiết, làm tăng token, độ trễ…",
          "<b>B. Start a fresh session to ensure the agent works with current codebase state without stale assumptions</b>: Bỏ qua yêu cầu chính “The session ID is valid, but version control”.",
          "<b>D. Resume the session without informing the agent about the changed files</b>: Phương án này tiếp tục dựa trên trạng thái cũ mà không cập nhật thay…"
        ]
      }
    },
    {
      "number": 13,
      "topic": 1,
      "type": "mcq",
      "question": "An engineer asks the agent to understand how the caching layer works before adding a new cache invalidation trigger. After initial Grep searches, the agent has identified that caching logic spans 15 files including decorators, middleware, and service classes (~8,000 lines total). What's the most effective next step for building understanding while managing context constraints?",
      "options": [
        "Use the Read tool to sequentially load all 15 files, building complete understanding across the full caching implementation.",
        "Analyze imports and class hierarchies to identify the base cache class, Read that file to understand the interface, then trace specific invalidation implementations.",
        "Use Grep to search for \"invalidate\" and \"expire\" patterns across all files, then Read only those specific line ranges with minimal surrounding context.",
        "Use Glob to find files matching common caching patterns (cache.py, caching/), prioritize the largest files by reading them first, then check smaller files for gaps."
      ],
      "answers": [
        "Analyze imports and class hierarchies to identify the base cache class, Read that file to understand the interface, then trace specific invalidation implementations."
      ],
      "explanation": {
        "key": "<b>“After initial Grep searches, the agent has identified that caching logic”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Analyze imports and class hierarchies to identify the base cache class,”</b> <i>(trong đáp án B)</i>: Bắt đầu từ hierarchy lớp để tìm lớp bộ đệm cơ sở, đọc giao diện, sau đó theo…",
        "elimination": [
          "<b>A. Use the Read tool to sequentially load all 15 files, building complete understanding across the full caching implementation.</b>: Cách này giữ quá nhiều dữ liệu không cần thiết, làm tăng token, độ trễ…",
          "<b>C. Use Grep to search for \"invalidate\" and \"expire\" patterns across all files, then Read only those specific line ranges with minimal surrounding context.</b>: Tìm kiếm văn bản đơn thuần chỉ cho biết nơi một chuỗi xuất hiện; nó…",
          "<b>D. Use Glob to find files matching common caching patterns (cache.py, caching/), prioritize the largest files by reading them first, then check smaller files for gaps.</b>: Glob chủ yếu khớp tên hoặc đường dẫn tệp; nó không phải công cụ phù…"
        ]
      }
    },
    {
      "number": 14,
      "topic": 1,
      "type": "mcq",
      "question": "An engineer who just joined the team asks the agent to help them understand the authentication and authorization architecture before making security improvements. The codebase has 800+ files across multiple services. What exploration strategy will most effectively build understanding, given Claude built-in tools and context limits?",
      "options": [
        "Read all files containing \"auth\", \"login\", \"permission\", or \"token\" in their content or filename.",
        "Read any CLAUDE.md and README files first, then ask the engineer to specify which 10-15 files are most important for understanding the auth system.",
        "Use Grep to find authentication entry points, read those files, then follow imports and function calls to map the auth flow incrementally.",
        "Launch parallel subagents to explore different services simultaneously, then synthesize their findings into an architectural overview."
      ],
      "answers": [
        "Use Grep to find authentication entry points, read those files, then follow imports and function calls to map the auth flow incrementally."
      ],
      "explanation": {
        "key": "<b>“The codebase has 800+ files across multiple services.”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Use Grep to find authentication entry points, read those files, then”</b> <i>(trong đáp án C)</i>: Với codebase gồm hơn 800 tệp, việc khám phá tăng dần từ các điểm đầu vào và bằng…",
        "elimination": [
          "<b>A. Read all files containing \"auth\", \"login\", \"permission\", or \"token\" in their content or filename.</b>: Cách này giữ quá nhiều dữ liệu không cần thiết, làm tăng token, độ trễ…",
          "<b>B. Read any CLAUDE.md and README files first, then ask the engineer to specify which 10-15 files are most important for understanding the auth system.</b>: Bỏ qua yêu cầu chính “The codebase has 800+ files across multiple services”.",
          "<b>D. Launch parallel subagents to explore different services simultaneously, then synthesize their findings into an architectural overview.</b>: Bỏ qua yêu cầu chính “The codebase has 800+ files across multiple services”."
        ]
      }
    },
    {
      "number": 15,
      "topic": 1,
      "type": "mcq",
      "question": "After integrating a local MCP server providing code analysis tools (analyze_dependencies, find_dead_code, calculate_complexity), you notice the agent continues to use Grep to inspect dependencies even when users explicitly ask about \"code dependencies\". Tool definitions reveal: analyze_dependencies returns a dependency graph by analyzing imports. What's the most effective approach to improve the agent's selection of MCP tools?",
      "options": [
        "Split analyze_dependencies into granular tools: list_imports, detect_transitive_deps, identify_circular_deps to avoid overlap with Grep.",
        "Expand MCP tool descriptions and outputs–e.g., \"Builds dependency graph with list_imports, direct_circular_deps\"–to clearly distinguish dependencies and cycle analysis from Grep.",
        "Remove Grep from the available tools to eliminate functional overlap.",
        "Add routing questions to the system prompt specifying that dependency-related questions should use MCP tools rather than Grep."
      ],
      "answers": [
        "Expand MCP tool descriptions and outputs–e.g., \"Builds dependency graph with list_imports, direct_circular_deps\"–to clearly distinguish dependencies and cycle analysis from Grep."
      ],
      "explanation": {
        "key": "<b>“After integrating a local MCP server providing code analysis tools (analyze_dependencies,”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Expand MCP tool descriptions and outputs–e.g., \"Builds dependency graph with list_imports,”</b> <i>(trong đáp án B)</i>: agent không sử dụng công cụ MCP vì mô tả công cụ không đủ chi tiết để phân…",
        "elimination": [
          "<b>A. Split analyze_dependencies into granular tools: list_imports, detect_transitive_deps, identify_circular_deps to avoid overlap with Grep.</b>: Bỏ qua yêu cầu chính “After integrating a local MCP server providing code”.",
          "<b>C. Remove Grep from the available tools to eliminate functional overlap.</b>: Loại bỏ một tool nền tảng chỉ để ép lựa chọn làm giảm năng lực…",
          "<b>D. Add routing questions to the system prompt specifying that dependency-related questions should use MCP tools rather than Grep.</b>: Bổ sung hướng dẫn chung có thể cải thiện phần nào nhưng không làm rõ…"
        ]
      }
    },
    {
      "number": 16,
      "topic": 1,
      "type": "mcq",
      "question": "Your extraction pipeline processes contracts that frequently include amendments. When a contract contains both original terms and later amendments (e.g., original clause specifies \"30-day payment terms\" while Amendment 1 changes this to \"45 days\"), the model inconsistently extracts one value or the other with no indication of which applies. What's the most effective approach to improve extraction accuracy for documents with amendments?",
      "options": [
        "Add prompt instructions to always extract the most recent amendment value and ignore superseded original terms.",
        "Implement post-extraction validation using pattern matching to detect amendments and flag those extractions for manual review.",
        "Redesign the schema so amended fields capture multiple values, each with source location and effective date.",
        "Preprocess documents with a classifier that identifies and removes superseded sections before the main extraction step."
      ],
      "answers": [
        "Redesign the schema so amended fields capture multiple values, each with source location and effective date."
      ],
      "explanation": {
        "key": "<b>“When a contract contains both original terms and later amendments (e.g.,”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Redesign the schema so amended fields capture multiple values, each with”</b> <i>(trong đáp án C)</i>: Khi một tài liệu có cả điều khoản gốc và các sửa đổi, lược đồ sẽ nắm bắt…",
        "elimination": [
          "<b>A. Add prompt instructions to always extract the most recent amendment value and ignore superseded original terms.</b>: Bash có thể thực hiện thao tác nhưng dễ vỡ và bỏ qua contract hoặc…",
          "<b>B. Implement post-extraction validation using pattern matching to detect amendments and flag those extractions for manual review.</b>: Chuyển thẳng sang review thủ công chỉ xử lý hậu quả và không giảm tỷ…",
          "<b>D. Preprocess documents with a classifier that identifies and removes superseded sections before the main extraction step.</b>: Bash có thể thực hiện thao tác nhưng dễ vỡ và bỏ qua contract hoặc…"
        ]
      }
    },
    {
      "number": 17,
      "topic": 1,
      "type": "mcq",
      "question": "After deployment, you find that 12% of extractions contain semantic errors that pass JSON schema validation (e.g., a duration like \"30 minutes\" incorrectly placed in an ingredient quantity field). Human reviewers have capacity to check only 20% of extractions. Which approach most effectively allocates reviewer attention?",
      "options": [
        "Randomly sample 20% of extractions for review, using corrections to track accuracy and identify error patterns.",
        "Review all extractions from documents with formatting anomalies such as unusual layouts or mixed content types.",
        "Have the model output field-level confidence scores, then calibrate review thresholds using a labeled validation set.",
        "Prioritize review of all extractions where required fields are empty or explicitly marked as not found."
      ],
      "answers": [
        "Have the model output field-level confidence scores, then calibrate review thresholds using a labeled validation set."
      ],
      "explanation": {
        "key": "<b>“Human reviewers have capacity to check only 20% of extractions.”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Have the model output field-level confidence scores, then calibrate review thresholds”</b> <i>(trong đáp án C)</i>: Rất khó phát hiện lỗi ngữ nghĩa thông qua xác thực lược đồ.",
        "elimination": [
          "<b>A. Randomly sample 20% of extractions for review, using corrections to track accuracy and identify error patterns.</b>: Bỏ qua yêu cầu chính “Human reviewers have capacity to check only 20%”.",
          "<b>B. Review all extractions from documents with formatting anomalies such as unusual layouts or mixed content types.</b>: Bỏ qua yêu cầu chính “Human reviewers have capacity to check only 20%”.",
          "<b>D. Prioritize review of all extractions where required fields are empty or explicitly marked as not found.</b>: Bỏ qua yêu cầu chính “Human reviewers have capacity to check only 20%”."
        ]
      }
    },
    {
      "number": 18,
      "topic": 1,
      "type": "mcq",
      "question": "Your extraction pipeline processes invoices and extracts line items, tax amounts, and grand totals. You discover that 8% of documents have extracted line item amounts that don't sum to the extracted grand total—the downstream accounting system has been detecting mismatches. What's the most effective improvement?",
      "options": [
        "Extract line items and totals independently, then use a separate validation model to reconcile discrepancies.",
        "Implement post-processing that automatically adjusts line item amounts when the extracted total doesn't match the sum.",
        "Add few-shot examples to the system prompt where extracted line items correctly sum to demonstrate the desired extraction behavior.",
        "Add a calculated_total field where the model extracts line items independently, then validate totals alongside a is_total_consistent boolean flag for human review when values differ."
      ],
      "answers": [
        "Add a calculated_total field where the model extracts line items independently, then validate totals alongside a is_total_consistent boolean flag for human review when values differ."
      ],
      "explanation": {
        "key": "<b>“You discover that 8% of documents have extracted line item amounts”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Add a calculated_total field where the model extracts line items independently,”</b> <i>(trong đáp án D)</i>: Thêm trường được tính_total để mô hình có thể tự xác thực bằng cách tính tổng từ các…",
        "elimination": [
          "<b>A. Extract line items and totals independently, then use a separate validation model to reconcile discrepancies.</b>: Bỏ qua yêu cầu chính “You discover that 8% of documents have extracted”.",
          "<b>B. Implement post-processing that automatically adjusts line item amounts when the extracted total doesn't match the sum.</b>: Tự sửa số liệu để làm chúng khớp nhau có thể che giấu OCR hoặc…",
          "<b>C. Add few-shot examples to the system prompt where extracted line items correctly sum to demonstrate the desired extraction behavior.</b>: Bỏ qua yêu cầu chính “You discover that 8% of documents have extracted”."
        ]
      }
    },
    {
      "number": 19,
      "topic": 1,
      "type": "mcq",
      "question": "Your pipeline uses a tool called extract_metadata with a JSON schema for paper details. During testing, the agent sometimes fails to call extract_metadata because it wants to provide direct answers. What's the most reliable way to ensure metadata extraction always happens first?",
      "options": [
        "Set tool_choice to \"auto\" in the API call, combined with tools so that Claude always prioritizes metadata before any other tool calls.",
        "Set tool_choice to \"auto\" and reorder the tool definitions placing extract_metadata first since Claude prioritizes earlier-listed tools.",
        "Set tool_choice to type \"tool\", name \"extract_metadata\" and process the enrichment requests in subsequent turns after receiving the extracted metadata.",
        "Set tool_choice to type \"any\" so Claude must use a tool, combined with system prompt instructions to call extract_metadata first."
      ],
      "answers": [
        "Set tool_choice to type \"tool\", name \"extract_metadata\" and process the enrichment requests in subsequent turns after receiving the extracted metadata."
      ],
      "explanation": {
        "key": "<b>“During testing, the agent sometimes fails to call extract_metadata because it”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Set tool_choice to type \"tool\", name \"extract_metadata\" and process the enrichment”</b> <i>(trong đáp án C)</i>: Việc sử dụng tool_choice với loại \"tool\" và tên \"extract_metadata\" buộc Claude phải gọi đúng công cụ trước.",
        "elimination": [
          "<b>A. Set tool_choice to \"auto\" in the API call, combined with tools so that Claude always prioritizes metadata before any other tool calls.</b>: tool_choice: \"auto\" vẫn cho phép Claude trả lời bằng text hoặc chọn tool khác; nó…",
          "<b>B. Set tool_choice to \"auto\" and reorder the tool definitions placing extract_metadata first since Claude prioritizes earlier-listed tools.</b>: tool_choice: \"auto\" vẫn cho phép Claude trả lời bằng text hoặc chọn tool khác; nó…",
          "<b>D. Set tool_choice to type \"any\" so Claude must use a tool, combined with system prompt instructions to call extract_metadata first.</b>: tool_choice: \"any\" chỉ ép dùng một tool bất kỳ, không bảo đảm đúng tool hoặc…"
        ]
      }
    },
    {
      "number": 20,
      "topic": 1,
      "type": "mcq",
      "question": "After your daily batch of 10,000 documents completes, 300 documents (3%) failed with \"context_length_exceeded\" errors. The results file identifies each failure by custom_id. What's the most cost-effective approach to process these failures?",
      "options": [
        "Resubmit only the 300 failed documents after chunking them into smaller pieces, then combine the partial extractions",
        "Increase the max_tokens parameter for the 300 failed documents and resubmit them in a new batch",
        "Reprocess the entire batch with prompt caching enabled to reduce the cost of retrying requests with identical system prompts",
        "Resubmit the entire 10,000 document batch using a model tier with a larger context window"
      ],
      "answers": [
        "Resubmit only the 300 failed documents after chunking them into smaller pieces, then combine the partial extractions"
      ],
      "explanation": {
        "key": "<b>“After your daily batch of 10,000 documents completes, 300 documents (3%)”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Resubmit only the 300 failed documents after chunking them into smaller”</b> <i>(trong đáp án A)</i>: context_length_exceeded là lỗi vì đầu vào quá dài chứ không phải đầu ra.",
        "elimination": [
          "<b>B. Increase the max_tokens parameter for the 300 failed documents and resubmit them in a new batch</b>: Bỏ qua yêu cầu chính “After your daily batch of 10,000 documents completes,”.",
          "<b>C. Reprocess the entire batch with prompt caching enabled to reduce the cost of retrying requests with identical system prompts</b>: Retry có thể che bớt lỗi tạm thời nhưng không cung cấp cho agent loại…",
          "<b>D. Resubmit the entire 10,000 document batch using a model tier with a larger context window</b>: Bỏ qua yêu cầu chính “After your daily batch of 10,000 documents completes,”."
        ]
      }
    },
    {
      "number": 21,
      "topic": 1,
      "type": "mcq",
      "question": "Your extraction system parses e-commerce product descriptions to extract specifications like dimensions, weight, and materials into JSON. Despite having a well-defined schema, the model inconsistently extracts the \"materials\" field–sometimes returning \"cotton blend\", other times \"Cotton/Polyester mix\", and occasionally omitting the field when material information is clearly present in the source. What's the most effective way to improve extraction consistency?",
      "options": [
        "Switch to a more capable model tier since inconsistent extraction indicates insufficient model capability",
        "Add few-shot examples showing 2-3 complete input-output pairs with standardized material description formats",
        "Set temperature to 0 to eliminate randomness and ensure deterministic outputs",
        "Make the \"materials\" field required instead of optional in the schema to force the model to always extract a value"
      ],
      "answers": [
        "Add few-shot examples showing 2-3 complete input-output pairs with standardized material description formats"
      ],
      "explanation": {
        "key": "<b>“Despite having a well-defined schema, the model inconsistently extracts the \"materials\"”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Add few-shot examples showing 2-3 complete input-output pairs with standardized material”</b> <i>(trong đáp án B)</i>: Sự thiếu nhất quán trong quá trình trích xuất thường là do thiếu ví dụ cụ thể về…",
        "elimination": [
          "<b>A. Switch to a more capable model tier since inconsistent extraction indicates insufficient model capability</b>: Đổi model có thể cải thiện chất lượng chung nhưng không xử lý nguyên nhân…",
          "<b>C. Set temperature to 0 to eliminate randomness and ensure deterministic outputs</b>: Temperature chỉ điều chỉnh độ biến thiên khi sinh; nó không sửa schema, thiếu context…",
          "<b>D. Make the \"materials\" field required instead of optional in the schema to force the model to always extract a value</b>: Ép trường bắt buộc khi nguồn có thể không chứa dữ liệu sẽ khuyến khích…"
        ]
      }
    },
    {
      "number": 22,
      "topic": 1,
      "type": "mcq",
      "question": "Your system extracts event metadata (date, location, organizer, attendee_count) from news articles using a JSON schema with all nullable fields. During evaluation, you observe the model frequently generates plausible but incorrect values for fields not mentioned in the article–for example, outputting \"500\" for attendee_count when the source contains no attendance information. What's the most effective way to reduce these false extractions?",
      "options": [
        "Make all schema fields required (non-nullable) with strict validation rules to ensure the model only outputs verifiable data.",
        "Upgrade to a more capable model tier with improved instruction-following to reduce hallucination tendencies.",
        "Add a post-processing step using a second LLM call to verify each extracted value exists in the source document.",
        "Add prompt instructions to return null for any field where information is not directly stated in the source."
      ],
      "answers": [
        "Add prompt instructions to return null for any field where information is not directly stated in the source."
      ],
      "explanation": {
        "key": "<b>“During evaluation, you observe the model frequently generates plausible but incorrect”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Add prompt instructions to return null for any field where information”</b> <i>(trong đáp án D)</i>: Mô hình tạo ảo giác về các giá trị có thể xảy ra cho các trường không có…",
        "elimination": [
          "<b>A. Make all schema fields required (non-nullable) with strict validation rules to ensure the model only outputs verifiable data.</b>: Ép trường bắt buộc khi nguồn có thể không chứa dữ liệu sẽ khuyến khích…",
          "<b>B. Upgrade to a more capable model tier with improved instruction-following to reduce hallucination tendencies.</b>: Đổi model có thể cải thiện chất lượng chung nhưng không xử lý nguyên nhân…",
          "<b>C. Add a post-processing step using a second LLM call to verify each extracted value exists in the source document.</b>: Bỏ qua yêu cầu chính “During evaluation, you observe the model frequently generates”."
        ]
      }
    },
    {
      "number": 23,
      "topic": 1,
      "type": "mcq",
      "question": "After implementing tool use with strict schema definitions, JSON syntax errors are eliminated, but 5% of extractions still have valid JSON with empty arrays or null values for required fields like citations and methodology. Spot-checking reveals that source documents contain this information, but in varied formats–inline citations vs. bibliographies, methodology sections vs. details embedded in introductions. What's the most effective way to address these failures?",
      "options": [
        "Build a regex-based post-processing layer that scans source documents for citation patterns and methodology keywords, populating empty fields when the model fails to extract.",
        "Modify your schema to make citations and methodology optional, and flag incomplete records for manual review rather than failing validation.",
        "Add few-shot examples demonstrating extractions from documents with varied structures–showing how to identify citations in different formats and locate methodology details across section types.",
        "Implement retry logic that re-sends requests when validation detects empty required fields."
      ],
      "answers": [
        "Add few-shot examples demonstrating extractions from documents with varied structures–showing how to identify citations in different formats and locate methodology details across section types."
      ],
      "explanation": {
        "key": "<b>“After implementing tool use with strict schema definitions, JSON syntax errors”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Add few-shot examples demonstrating extractions from documents with varied structures–showing how”</b> <i>(trong đáp án C)</i>: Vì cùng một thông tin xuất hiện ở nhiều định dạng khác nhau (nội tuyến so với thư…",
        "elimination": [
          "<b>A. Build a regex-based post-processing layer that scans source documents for citation patterns and methodology keywords, populating empty fields when the model fails to extract.</b>: Bash có thể thực hiện thao tác nhưng dễ vỡ và bỏ qua contract hoặc…",
          "<b>B. Modify your schema to make citations and methodology optional, and flag incomplete records for manual review rather than failing validation.</b>: Chuyển thẳng sang review thủ công chỉ xử lý hậu quả và không giảm tỷ…",
          "<b>D. Implement retry logic that re-sends requests when validation detects empty required fields.</b>: Retry không thể tạo ra dữ liệu còn thiếu hoặc sửa lỗi validation, permission hay…"
        ]
      }
    },
    {
      "number": 24,
      "topic": 1,
      "type": "mcq",
      "question": "Your extraction system implements automatic retries when validation fails. On each retry, the specific validation error is appended to the prompt. This retry-with-error-feedback approach resolves most failures within 2-3 attempts For which failure pattern would additional retries be LEAST effective?",
      "options": [
        "The model extracts citation counts as locale-formatted strings (\"1,234\") when the schema requires integers",
        "The model extracts keywords as a nested object organized by category when the schema requires a flat array of strings",
        "The model extracts \"et al.\" for co-authors when the full list exists only in an external document not in the input",
        "The model extracts dates as ISO 8601 datetime strings (\"2023-03-15T00:00:00Z\") when the schema requires only the date portion (YYYY-MM-DD)"
      ],
      "answers": [
        "The model extracts \"et al.\" for co-authors when the full list exists only in an external document not in the input"
      ],
      "explanation": {
        "key": "<b>“Your extraction system implements automatic retries when validation fails.”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“The model extracts \"et al.\" for co-authors when the full list”</b> <i>(trong đáp án C)</i>: Không có lần thử lại nào sẽ hiển thị thông tin mô hình không có trong dữ liệu…",
        "elimination": [
          "<b>A. The model extracts citation counts as locale-formatted strings (\"1,234\") when the schema requires integers</b>: Bỏ qua yêu cầu chính “Your extraction system implements automatic retries when validation”.",
          "<b>B. The model extracts keywords as a nested object organized by category when the schema requires a flat array of strings</b>: Bỏ qua yêu cầu chính “Your extraction system implements automatic retries when validation”.",
          "<b>D. The model extracts dates as ISO 8601 datetime strings (\"2023-03-15T00:00:00Z\") when the schema requires only the date portion (YYYY-MM-DD)</b>: Bỏ qua yêu cầu chính “Your extraction system implements automatic retries when validation”."
        ]
      }
    },
    {
      "number": 25,
      "topic": 1,
      "type": "mcq",
      "question": "Your extraction pipeline processes restaurant menus and must output structured JSON with fields for item names, descriptions, prices, and dietary tags. Some menus use inconsistent formatting–prices as \"$12\" vs \"12.00\", dietary info as icons vs text. What's the most reliable approach?",
      "options": [
        "Define a strict output schema and include format normalization rules in your prompt.",
        "Use separate extraction calls for each field to ensure consistent handling of each type.",
        "Extract data as-is and normalize formats in post-processing code after Claude returns.",
        "Request multiple extraction attempts per document and select the most common format."
      ],
      "answers": [
        "Define a strict output schema and include format normalization rules in your prompt."
      ],
      "explanation": {
        "key": "<b>“Some menus use inconsistent formatting–prices as \"$12\" vs \"12.00\", dietary info”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Define a strict output schema and include format normalization rules in”</b> <i>(trong đáp án A)</i>: Đối với các menu có định dạng không nhất quán, việc kết hợp lược đồ (cấu trúc) đầu…",
        "elimination": [
          "<b>B. Use separate extraction calls for each field to ensure consistent handling of each type.</b>: Bỏ qua yêu cầu chính “Some menus use inconsistent formatting–prices as \"$12\" vs”.",
          "<b>C. Extract data as-is and normalize formats in post-processing code after Claude returns.</b>: Bỏ qua yêu cầu chính “Some menus use inconsistent formatting–prices as \"$12\" vs”.",
          "<b>D. Request multiple extraction attempts per document and select the most common format.</b>: Bỏ qua yêu cầu chính “Some menus use inconsistent formatting–prices as \"$12\" vs”."
        ]
      }
    },
    {
      "number": 26,
      "topic": 1,
      "type": "mcq",
      "question": "Your extraction uses tool use with a JSON schema where property_type is defined as an enum: ['house', 'apartment', 'condo', 'townhouse']. After deployment, 8% of extractions fail schema validation. Investigation reveals listings mention many uncommon property types –\"studio\", \"loft\", \"duplex\", \"mobile home\", \"tiny house\", \"converted warehouse\"–and new types continue appearing regularly. What's the most effective long-term solution?",
      "options": [
        "Add an \"other\" value to your enum with a separate property_type_detail string field for specifics when \"other\" is selected.",
        "Add few-shot examples to your prompt demonstrating how to map unexpected property types to the closest existing enum value.",
        "Change property_type from an enum to a free-form string and implement a normalization step in post-processing.",
        "Continuously expand the enum to include newly observed property types and add monitoring for additional edge cases."
      ],
      "answers": [
        "Add an \"other\" value to your enum with a separate property_type_detail string field for specifics when \"other\" is selected."
      ],
      "explanation": {
        "key": "<b>“Investigation reveals listings mention many uncommon property types –\"studio\", \"loft\", \"duplex\",”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Add an \"other\" value to your enum with a separate property_type_detail”</b> <i>(trong đáp án A)</i>: Bởi vì các loại thuộc tính mới liên tục xuất hiện nên các enum cứng sẽ luôn lỗi…",
        "elimination": [
          "<b>B. Add few-shot examples to your prompt demonstrating how to map unexpected property types to the closest existing enum value.</b>: Bỏ qua yêu cầu chính “Investigation reveals listings mention many uncommon property types”.",
          "<b>C. Change property_type from an enum to a free-form string and implement a normalization step in post-processing.</b>: Đầu ra text tự do buộc downstream hoặc model phải parse lại, làm tăng lỗi…",
          "<b>D. Continuously expand the enum to include newly observed property types and add monitoring for additional edge cases.</b>: Bỏ qua yêu cầu chính “Investigation reveals listings mention many uncommon property types”."
        ]
      }
    },
    {
      "number": 27,
      "topic": 1,
      "type": "mcq",
      "question": "Your system has been operating with 100% human review for 3 months. Analysis shows that extractions with model confidence >90% have 97% accuracy overall. To reduce reviewer workload, you plan to automate high-confidence extractions Before deploying, what validation step is most critical?",
      "options": [
        "Run a two-week pilot routing 25% of high-confidence extractions directly to downstream systems and monitor error reports.",
        "Verify that 97% accuracy meets requirements for all downstream systems that consume the extracted data.",
        "Analyze accuracy by document type and field to verify high-confidence extractions perform consistently across all segments, not just in aggregate.",
        "Compare accuracy at different confidence thresholds (85%, 90%, 95%) to find the optimal cutoff that maximizes automation while minimizing errors."
      ],
      "answers": [
        "Analyze accuracy by document type and field to verify high-confidence extractions perform consistently across all segments, not just in aggregate."
      ],
      "explanation": {
        "key": "<b>“Analysis shows that extractions with model confidence >90% have 97% accuracy”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Analyze accuracy by document type and field to verify high-confidence extractions”</b> <i>(trong đáp án C)</i>: Độ chính xác tổng hợp che giấu các lỗi phân đoạn - một loại tài liệu có thể…",
        "elimination": [
          "<b>A. Run a two-week pilot routing 25% of high-confidence extractions directly to downstream systems and monitor error reports.</b>: Bỏ qua yêu cầu chính “Analysis shows that extractions with model confidence >90%”.",
          "<b>B. Verify that 97% accuracy meets requirements for all downstream systems that consume the extracted data.</b>: Bỏ qua yêu cầu chính “Analysis shows that extractions with model confidence >90%”.",
          "<b>D. Compare accuracy at different confidence thresholds (85%, 90%, 95%) to find the optimal cutoff that maximizes automation while minimizing errors.</b>: Bỏ qua yêu cầu chính “Analysis shows that extractions with model confidence >90%”."
        ]
      }
    },
    {
      "number": 28,
      "topic": 1,
      "type": "mcq",
      "question": "Documents arrive continuously throughout business hours and need structured data extracted. To reduce costs, you want to use the Message Batches API (50% discount, up-to-24-hour processing window). Your SLA specifies that extraction results must be available within 30 hours of document arrival with 99.9% reliability. Which batching strategy is most appropriate?",
      "options": [
        "Submit a single batch at end of day containing all documents from that day",
        "Submit batches every 6 hours containing documents from that window",
        "Use the real-time API for all documents instead of batch processing",
        "Submit batches every 4 hours containing documents from that window"
      ],
      "answers": [
        "Submit batches every 4 hours containing documents from that window"
      ],
      "explanation": {
        "key": "<b>“Your SLA specifies that extraction results must be available within 30”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Submit batches every 4 hours containing documents from that window”</b> <i>(trong đáp án D)</i>: Việc gửi các đợt 4 giờ một lần đảm bảo rằng trong trường hợp xấu nhất, tài liệu…",
        "elimination": [
          "<b>A. Submit a single batch at end of day containing all documents from that day</b>: Batch có độ trễ bất đồng bộ; cách chia này không để đủ safety margin…",
          "<b>B. Submit batches every 6 hours containing documents from that window</b>: Batch có độ trễ bất đồng bộ; cách chia này không để đủ safety margin…",
          "<b>C. Use the real-time API for all documents instead of batch processing</b>: Dùng real-time cho toàn bộ khối lượng đáp ứng latency nhưng bỏ qua cơ hội…"
        ]
      }
    },
    {
      "number": 29,
      "topic": 1,
      "type": "mcq",
      "question": "Your schema includes a skills: string[] field. Production monitoring reveals three consistency issues: (1) compound phrases like \"Python and SQL\" are sometimes kept as one entry, sometimes split; (2) implied but unstated skills occasionally appear in extractions; (3) similar documents produce wildly different array lengths (5-10 vs 40+ entries). Your prompt currently says \"Extract all skills mentioned.\" What's the most effective improvement?",
      "options": [
        "Add post-extraction normalization that maps skills to a canonical taxonomy and deduplicates similar entries.",
        "Add constraints: \"Extract 10-20 skills maximum, one skill per entry, only explicitly named skills.\"",
        "Add few-shot examples demonstrating compound phrase handling, explicit mention criteria, and appropriate entry granularity.",
        "Enrich the schema to {skill: string, confidence: float, source_quote: string[]} to capture extraction metadata."
      ],
      "answers": [
        "Add few-shot examples demonstrating compound phrase handling, explicit mention criteria, and appropriate entry granularity."
      ],
      "explanation": {
        "key": "<b>“Your prompt currently says \"Extract all skills mentioned.\"”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Add few-shot examples demonstrating compound phrase handling, explicit mention criteria, and”</b> <i>(trong đáp án C)</i>: Ba vấn đề (cụm từ ghép, kỹ năng ngụ ý, độ dài không nhất quán) đều xuất phát…",
        "elimination": [
          "<b>A. Add post-extraction normalization that maps skills to a canonical taxonomy and deduplicates similar entries.</b>: Bỏ qua yêu cầu chính “Your prompt currently says \"Extract all skills mentioned.\"”.",
          "<b>B. Add constraints: \"Extract 10-20 skills maximum, one skill per entry, only explicitly named skills.\"</b>: Bỏ qua yêu cầu chính “Your prompt currently says \"Extract all skills mentioned.\"”.",
          "<b>D. Enrich the schema to {skill: string, confidence: float, source_quote: string[]} to capture extraction metadata.</b>: Bỏ qua yêu cầu chính “Your prompt currently says \"Extract all skills mentioned.\"”."
        ]
      }
    },
    {
      "number": 30,
      "topic": 1,
      "type": "mcq",
      "question": "Your extraction system processes two document types: standard monthly reports (archived after processing) and urgent exception reports (must trigger business alerts within 30 minutes of receipt). Both use the same JSON schema. You want to minimize API costs while meeting latency requirements. How should you architect the processing pipeline?",
      "options": [
        "Queue all documents and submit hourly batches, flagging urgent documents for expedited handling when batch results return.",
        "Route standard reports to the Batch API for 50% cost savings, and route urgent exception reports to the real-time Messages API.",
        "Submit all documents to the Batch API with custom_ids for tracking. When results arrive, immediately process urgent documents and trigger delayed alerts for exceptions.",
        "Submit all documents to the real-time Messages API to ensure consistent processing latency across document types."
      ],
      "answers": [
        "Route standard reports to the Batch API for 50% cost savings, and route urgent exception reports to the real-time Messages API."
      ],
      "explanation": {
        "key": "<b>“You want to minimize API costs while meeting latency requirements.”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Route standard reports to the Batch API for 50% cost savings,”</b> <i>(trong đáp án B)</i>: Standard monthly reports không cần phản hồi ngay nên phù hợp với Batch API để giảm chi phí.",
        "elimination": [
          "<b>A. Queue all documents and submit hourly batches, flagging urgent documents for expedited handling when batch results return.</b>: Batch có độ trễ bất đồng bộ; cách chia này không để đủ safety margin…",
          "<b>C. Submit all documents to the Batch API with custom_ids for tracking. When results arrive, immediately process urgent documents and trigger delayed alerts for exceptions.</b>: Batch có độ trễ bất đồng bộ; cách chia này không để đủ safety margin…",
          "<b>D. Submit all documents to the real-time Messages API to ensure consistent processing latency across document types.</b>: Bỏ qua yêu cầu chính “You want to minimize API costs while meeting”."
        ]
      }
    },
    {
      "number": 31,
      "topic": 1,
      "type": "mcq",
      "question": "The document analysis agent has a single analyze_document tool that takes a document and a free-text instruction parameter. During evaluation, requests like \"extract the key financial metrics\" often return narrative summaries, while \"summarize the methodology\" sometimes returns raw data tables. The synthesis agent reports that 35% of analysis results require re-requests with clarified instructions. What's the most effective way to improve reliability?",
      "options": [
        "Keep the single tool but add an analysis_type enum parameter requiring explicit selection between extraction, summarization, and verification modes.",
        "Split the generic tool into purpose-specific tools– extract_data_points, summarize_content, verify_claim_against_source –each with defined input/output contracts.",
        "Have the coordinator pre-classify each analysis request before passing instructions to the document analysis agent.",
        "Enhance the tool description with detailed examples showing how different instruction phrasings should map to different output formats."
      ],
      "answers": [
        "Split the generic tool into purpose-specific tools– extract_data_points, summarize_content, verify_claim_against_source –each with defined input/output contracts."
      ],
      "explanation": {
        "key": "<b>“The synthesis agent reports that 35% of analysis results require re-requests”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Split the generic tool into purpose-specific tools– extract_data_points, summarize_content, verify_claim_against_source –each”</b> <i>(trong đáp án B)</i>: Phân tích_tài liệu chung với các hướng dẫn văn bản tự do dẫn đến kết quả đầu ra…",
        "elimination": [
          "<b>A. Keep the single tool but add an analysis_type enum parameter requiring explicit selection between extraction, summarization, and verification modes.</b>: Bỏ qua yêu cầu chính “The synthesis agent reports that 35% of analysis”.",
          "<b>C. Have the coordinator pre-classify each analysis request before passing instructions to the document analysis agent.</b>: Bỏ qua yêu cầu chính “The synthesis agent reports that 35% of analysis”.",
          "<b>D. Enhance the tool description with detailed examples showing how different instruction phrasings should map to different output formats.</b>: Bỏ qua yêu cầu chính “The synthesis agent reports that 35% of analysis”."
        ]
      }
    },
    {
      "number": 32,
      "topic": 1,
      "type": "mcq",
      "question": "The coordinator agent has AgentFunctions configured for all four specialized subagents, each with appropriate descriptions and restrictions. During testing, you find the coordinator sometimes fails to delegate—it writes \"I'll ask the web search agent to find sources\" without actually invoking it. What is the most likely cause?",
      "options": [
        "The AgentFunctions are configured correctly, but the coordinator's system prompt includes a statement that prevents it from knowing the available subagent types.",
        "The coordinator's allowed Tools configuration doesn't include \"Task\", so while it can describe delegation, it cannot actually invoke the tool required to spawn subagents.",
        "The coordinator's max_tokens setting is too low, causing the Task tool invocation to be truncated before the subagent parameter can be specified.",
        "Subagent context limit descriptions from the coordinator don't provide enough context; you need to configure explicit context content between coordinator and tool descriptions."
      ],
      "answers": [
        "The coordinator's allowed Tools configuration doesn't include \"Task\", so while it can describe delegation, it cannot actually invoke the tool required to spawn subagents."
      ],
      "explanation": {
        "key": "<b>“During testing, you find the coordinator sometimes fails to delegate—it writes”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“The coordinator's allowed Tools configuration doesn't include \"Task\", so while it”</b> <i>(trong đáp án B)</i>: Điều phối viên có thể mô tả ủy quyền (tạo văn bản), nhưng thực tế không thể gọi…",
        "elimination": [
          "<b>A. The AgentFunctions are configured correctly, but the coordinator's system prompt includes a statement that prevents it from knowing the available subagent types.</b>: Bỏ qua yêu cầu chính “During testing, you find the coordinator sometimes fails”.",
          "<b>C. The coordinator's max_tokens setting is too low, causing the Task tool invocation to be truncated before the subagent parameter can be specified.</b>: Bỏ qua yêu cầu chính “During testing, you find the coordinator sometimes fails”.",
          "<b>D. Subagent context limit descriptions from the coordinator don't provide enough context; you need to configure explicit context content between coordinator and tool descriptions.</b>: Bỏ qua yêu cầu chính “During testing, you find the coordinator sometimes fails”."
        ]
      }
    },
    {
      "number": 33,
      "topic": 1,
      "type": "mcq",
      "question": "When researching \"renewable energy adoption,\" the web search agent returns recent statistics (2024: 35% adoption) while the document analysis agent extracts data from internal reports (2022: 18% adoption). The synthesis agent incorrectly flags these as contradictory sources rather than recognizing the data shows growth over time. What change would best enable the synthesis agent to correctly interpret such temporal differences?",
      "options": [
        "Add a conflict resolution agent that automatically discards older data when newer data exists for the same metric.",
        "Configure the web search agent to only return results from the past 6 months.",
        "Require subagents to include publication or data collection dates in their structured outputs.",
        "Instruct the synthesis agent to always treat the most recent data as authoritative and place older findings in a separate historical appendix."
      ],
      "answers": [
        "Require subagents to include publication or data collection dates in their structured outputs."
      ],
      "explanation": {
        "key": "<b>“The synthesis agent incorrectly flags these as contradictory sources rather than”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Require subagents to include publication or data collection dates in their”</b> <i>(trong đáp án C)</i>: Tác nhân tổng hợp đọc sai dữ liệu vì nó không bao giờ nhìn thấy ngày tháng.",
        "elimination": [
          "<b>A. Add a conflict resolution agent that automatically discards older data when newer data exists for the same metric.</b>: Bỏ qua yêu cầu chính “The synthesis agent incorrectly flags these as contradictory”.",
          "<b>B. Configure the web search agent to only return results from the past 6 months.</b>: Bỏ qua yêu cầu chính “The synthesis agent incorrectly flags these as contradictory”.",
          "<b>D. Instruct the synthesis agent to always treat the most recent data as authoritative and place older findings in a separate historical appendix.</b>: Bỏ qua yêu cầu chính “The synthesis agent incorrectly flags these as contradictory”."
        ]
      }
    },
    {
      "number": 34,
      "topic": 1,
      "type": "mcq",
      "question": "Your multi-agent research pipeline crashed after processing 12 of 28 documents. The web search agent had identified relevant sources, the document analysis agent had partially completed extraction, and the synthesizer had begun pattern identification. You need to resume processing without repeating work or losing fidelity of prior findings. What state management approach best balances information fidelity with context efficiency when restoring agent state?",
      "options": [
        "Have each agent maintain its own persistent state file and reload it independently at the start of each session.",
        "Index all agent outputs in a shared vector store. When resuming, each agent queries the store using semantic search to retrieve relevant prior findings.",
        "Have each agent persist a structured report to a known location. On resume, the coordinator loads the reports and injects relevant state into agent prompts.",
        "Persist the coordinator's conversation log containing all task delegations and responses, providing this to agents when resuming."
      ],
      "answers": [
        "Have each agent persist a structured report to a known location. On resume, the coordinator loads the reports and injects relevant state into agent prompts."
      ],
      "explanation": {
        "key": "<b>“You need to resume processing without repeating work or losing fidelity”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Have each agent persist a structured report to a known location.”</b> <i>(trong đáp án C)</i>: Các báo cáo có cấu trúc vẫn tồn tại ở các vị trí đã biết cho phép coordinator…",
        "elimination": [
          "<b>A. Have each agent maintain its own persistent state file and reload it independently at the start of each session.</b>: Bỏ qua yêu cầu chính “You need to resume processing without repeating work”.",
          "<b>B. Index all agent outputs in a shared vector store. When resuming, each agent queries the store using semantic search to retrieve relevant prior findings.</b>: Retrieval có thể hữu ích ở quy mô lớn nhưng bổ sung hạ tầng và…",
          "<b>D. Persist the coordinator's conversation log containing all task delegations and responses, providing this to agents when resuming.</b>: Bỏ qua yêu cầu chính “You need to resume processing without repeating work”."
        ]
      }
    },
    {
      "number": 35,
      "topic": 1,
      "type": "mcq",
      "question": "Production reviews reveal inconsistent handling of uncertainty in final reports. Sometimes confidence calibrations are synthesized into standardized uncertainty expressions, while other times results produce vague estimates without clear methodology. Which system-level improvement best addresses this inconsistency?",
      "options": [
        "Implement a confidence calibration layer where synthesis agent normalizes uncertainty expressions into standardized probability representations (0.0-1.0), then weights their calibrated confidence.",
        "Instruct the synthesis agent to use explicit sections separating confirmed findings from contested analysis, preserving original source characterizations.",
        "Configure subagents to only report findings with sufficient coverage breadth, source diversity, and quality criteria before passing results to the synthesis agent.",
        "Add a verification subagent that cross-references findings across sources, only accepting synthesis corroborated by at least two independent sources."
      ],
      "answers": [
        "Instruct the synthesis agent to use explicit sections separating confirmed findings from contested analysis, preserving original source characterizations."
      ],
      "explanation": {
        "key": "<b>“Sometimes confidence calibrations are synthesized into standardized uncertainty expressions, while other”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Instruct the synthesis agent to use explicit sections separating confirmed findings”</b> <i>(trong đáp án B)</i>: Cấu trúc báo cáo tách biệt rõ ràng những phát hiện đã được xác nhận với những phát…",
        "elimination": [
          "<b>A. Implement a confidence calibration layer where synthesis agent normalizes uncertainty expressions into standardized probability representations (0.0-1.0), then weights their calibrated confidence.</b>: Bỏ qua yêu cầu chính “Sometimes confidence calibrations are synthesized into standardized uncertainty”.",
          "<b>C. Configure subagents to only report findings with sufficient coverage breadth, source diversity, and quality criteria before passing results to the synthesis agent.</b>: Bỏ qua yêu cầu chính “Sometimes confidence calibrations are synthesized into standardized uncertainty”.",
          "<b>D. Add a verification subagent that cross-references findings across sources, only accepting synthesis corroborated by at least two independent sources.</b>: Bỏ qua yêu cầu chính “Sometimes confidence calibrations are synthesized into standardized uncertainty”."
        ]
      }
    },
    {
      "number": 36,
      "topic": 1,
      "type": "mcq",
      "question": "The coordinator provides detailed step-by-step instructions to the web search subagent, specifying exact search queries, source quality criteria (coverage breadth, source diversity), and content type classifications. The coordinator sometimes encounters challenges where instructions fail when the subagent encounters unexpected situations. What's the most effective way to improve subagent adaptability?",
      "options": [
        "Remove procedural detail entirely, delegating with simple goals like \"research it thoroughly\" and relying on the subagent's general capabilities.",
        "Specify research goals and quality criteria (coverage breadth, source diversity, content type) rather than procedural instructions, letting the subagent determine execution.",
        "Add explicit fallback directives to the detailed instructions: \"if specified searches fail, attempt alternative queries before reporting failure.\"",
        "Implement a task classification step where the coordinator categorizes requests as \"analytical\" vs \"exploratory\" and uses different instruction sets for each category."
      ],
      "answers": [
        "Specify research goals and quality criteria (coverage breadth, source diversity, content type) rather than procedural instructions, letting the subagent determine execution."
      ],
      "explanation": {
        "key": "<b>“The coordinator sometimes encounters challenges where instructions fail when the subagent”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Specify research goals and quality criteria (coverage breadth, source diversity, content”</b> <i>(trong đáp án B)</i>: Hướng dẫn từng bước quá cứng nhắc, khiến subagent không thể thích ứng khi gặp phải tình huống…",
        "elimination": [
          "<b>A. Remove procedural detail entirely, delegating with simple goals like \"research it thoroughly\" and relying on the subagent's general capabilities.</b>: Bỏ qua yêu cầu chính “The coordinator sometimes encounters challenges where instructions fail”.",
          "<b>C. Add explicit fallback directives to the detailed instructions: \"if specified searches fail, attempt alternative queries before reporting failure.\"</b>: Bỏ qua yêu cầu chính “The coordinator sometimes encounters challenges where instructions fail”.",
          "<b>D. Implement a task classification step where the coordinator categorizes requests as \"analytical\" vs \"exploratory\" and uses different instruction sets for each category.</b>: Bỏ qua yêu cầu chính “The coordinator sometimes encounters challenges where instructions fail”."
        ]
      }
    },
    {
      "number": 37,
      "topic": 1,
      "type": "mcq",
      "question": "A user is expanding the research system beyond its single web search agent by adding specialized data sources. They add a financial API agent that returns structured JSON with revenue, margins, and growth rates; a news monitoring agent that returns prose summaries of recent developments; and a patent analysis agent that returns structured lists of technology areas. The synthesis agent combines these into executive briefings. Currently, it converts everything to bullet points, causing financial comparisons to lose tabular clarity and news summaries to lose narrative flow. What change would most improve briefing quality?",
      "options": [
        "Standardize all subagent outputs to prose summaries with inline citations.",
        "Add a format conversion layer between subagents and synthesis that transforms all outputs to a common intermediate representation.",
        "Update the synthesis agent to render each content type appropriately–financial data as tables, news as prose.",
        "Standardize all subagent outputs to JSON with fields for claim, evidence, source, and confidence."
      ],
      "answers": [
        "Update the synthesis agent to render each content type appropriately–financial data as tables, news as prose."
      ],
      "explanation": {
        "key": "<b>“Currently, it converts everything to bullet points, causing financial comparisons to”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Update the synthesis agent to render each content type appropriately–financial data”</b> <i>(trong đáp án C)</i>: Vấn đề là agent tổng hợp chuyển đổi mọi thứ thành dấu đầu dòng.",
        "elimination": [
          "<b>A. Standardize all subagent outputs to prose summaries with inline citations.</b>: Bỏ qua yêu cầu chính “Currently, it converts everything to bullet points, causing”.",
          "<b>B. Add a format conversion layer between subagents and synthesis that transforms all outputs to a common intermediate representation.</b>: Bỏ qua yêu cầu chính “Currently, it converts everything to bullet points, causing”.",
          "<b>D. Standardize all subagent outputs to JSON with fields for claim, evidence, source, and confidence.</b>: Bỏ qua yêu cầu chính “Currently, it converts everything to bullet points, causing”."
        ]
      }
    },
    {
      "number": 38,
      "topic": 1,
      "type": "mcq",
      "question": "The web search agent has gathered several relevant sources for a research topic. The document analysis agent now needs to examine these sources. How does information typically flow between these two specialized subagents?",
      "options": [
        "The coordinator agent receives the web search agent's output and includes relevant findings in the prompt when invoking the document analysis agent.",
        "Both agents access a shared memory store where the web search agent writes findings and the document analysis agent reads them.",
        "The web search agent directly invokes the document analysis agent, passing the discovered sources as parameters.",
        "The agents communicate through an event-driven message queue, with the document analysis agent subscribing to web search completion events."
      ],
      "answers": [
        "The coordinator agent receives the web search agent's output and includes relevant findings in the prompt when invoking the document analysis agent."
      ],
      "explanation": {
        "key": "<b>“The document analysis agent now needs to examine these sources.”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“The coordinator agent receives the web search agent's output and includes”</b> <i>(trong đáp án A)</i>: Trong kiến trúc đa agent có coordinator, thông tin sẽ chảy qua coordinator: agent tìm kiếm trên web…",
        "elimination": [
          "<b>B. Both agents access a shared memory store where the web search agent writes findings and the document analysis agent reads them.</b>: Bỏ qua yêu cầu chính “The document analysis agent now needs to examine”.",
          "<b>C. The web search agent directly invokes the document analysis agent, passing the discovered sources as parameters.</b>: Bỏ qua yêu cầu chính “The document analysis agent now needs to examine”.",
          "<b>D. The agents communicate through an event-driven message queue, with the document analysis agent subscribing to web search completion events.</b>: Bỏ qua yêu cầu chính “The document analysis agent now needs to examine”."
        ]
      }
    },
    {
      "number": 39,
      "topic": 1,
      "type": "mcq",
      "question": "After the web search agent and document analysis agent complete their tasks, the coordinator invokes the synthesis agent. However, the synthesis agent responds that it cannot complete the task because no research findings were provided. What is the most likely cause of this issue?",
      "options": [
        "The synthesis agent needs tools that can fetch results directly from the other agents' conversation histories.",
        "The subagents need to share a single API connection to enable automatic context sharing between invocations.",
        "The coordinator did not include the outputs from the previous agents in the synthesis agent's prompt.",
        "The synthesis agent's context window is not large enough to hold the combined outputs from both previous agents."
      ],
      "answers": [
        "The coordinator did not include the outputs from the previous agents in the synthesis agent's prompt."
      ],
      "explanation": {
        "key": "<b>“However, the synthesis agent responds that it cannot complete the task”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“The coordinator did not include the outputs from the previous agents”</b> <i>(trong đáp án C)</i>: Các subagent không tự động chia sẻ ngữ cảnh.",
        "elimination": [
          "<b>A. The synthesis agent needs tools that can fetch results directly from the other agents' conversation histories.</b>: Bỏ qua yêu cầu chính “However, the synthesis agent responds that it cannot”.",
          "<b>B. The subagents need to share a single API connection to enable automatic context sharing between invocations.</b>: Bỏ qua yêu cầu chính “However, the synthesis agent responds that it cannot”.",
          "<b>D. The synthesis agent's context window is not large enough to hold the combined outputs from both previous agents.</b>: Bỏ qua yêu cầu chính “However, the synthesis agent responds that it cannot”."
        ]
      }
    },
    {
      "number": 40,
      "topic": 1,
      "type": "mcq",
      "question": "In production, final reports frequently contain claims without proper source attribution. Investigation shows that while the web search and document analysis agents correctly attach citations to their outputs, the synthesis agent loses track of which sources support which conclusions when combining findings. What's the most effective architectural change?",
      "options": [
        "Require all subagents to output structured claim-source mappings that the synthesis agent must preserve and merge when combining findings from multiple sources.",
        "Add a verification step where the report generator uses semantic similarity matching against original sources to reconstruct which claims came from which documents.",
        "Have the coordinator inject source identifier prefixes into text before each handoff, then parse these prefixes at report generation to reconstruct citations.",
        "Maintain complete transcripts of all subagent interactions and add a citation-resolution agent to analyze logs and determine attributions before report generation."
      ],
      "answers": [
        "Require all subagents to output structured claim-source mappings that the synthesis agent must preserve and merge when combining findings from multiple sources."
      ],
      "explanation": {
        "key": "<b>“Investigation shows that while the web search and document analysis agents”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Require all subagents to output structured claim-source mappings that the synthesis”</b> <i>(trong đáp án A)</i>: Lỗi là do mất thông tin ở giai đoạn tổng hợp, do đó, cách khắc phục là thực…",
        "elimination": [
          "<b>B. Add a verification step where the report generator uses semantic similarity matching against original sources to reconstruct which claims came from which documents.</b>: Bỏ qua yêu cầu chính “Investigation shows that while the web search and”.",
          "<b>C. Have the coordinator inject source identifier prefixes into text before each handoff, then parse these prefixes at report generation to reconstruct citations.</b>: Bỏ qua yêu cầu chính “Investigation shows that while the web search and”.",
          "<b>D. Maintain complete transcripts of all subagent interactions and add a citation-resolution agent to analyze logs and determine attributions before report generation.</b>: Bỏ qua yêu cầu chính “Investigation shows that while the web search and”."
        ]
      }
    },
    {
      "number": 41,
      "topic": 1,
      "type": "mcq",
      "question": "Production monitoring shows that follow-up queries like \"summarize what we learned about market trends\" consistently take 40+ seconds. Investigation reveals the coordinator spawns the synthesis subagent for each summarization request, passing 80K+ tokens of accumulated findings. The coordinator already has these findings in its context from orchestrating the research. What's the most effective way to improve response time for these follow-up summaries?",
      "options": [
        "Spawn the synthesis subagent with reduced context and have it request specific findings from the coordinator on-demand.",
        "Pre-generate and cache summaries at multiple granularities whenever new findings accumulate.",
        "Have the coordinator handle straightforward summarization requests directly using its existing context, reserving subagent spawning for complex analysis.",
        "Enable prompt caching on the synthesis subagent to reduce the overhead of repeatedly transferring the same research findings."
      ],
      "answers": [
        "Have the coordinator handle straightforward summarization requests directly using its existing context, reserving subagent spawning for complex analysis."
      ],
      "explanation": {
        "key": "<b>“The coordinator already has these findings in its context from orchestrating”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Have the coordinator handle straightforward summarization requests directly using its existing”</b> <i>(trong đáp án C)</i>: Coordinator đã có toàn bộ findings trong context.",
        "elimination": [
          "<b>A. Spawn the synthesis subagent with reduced context and have it request specific findings from the coordinator on-demand.</b>: Bỏ qua yêu cầu chính “The coordinator already has these findings in its”.",
          "<b>B. Pre-generate and cache summaries at multiple granularities whenever new findings accumulate.</b>: Bỏ qua yêu cầu chính “The coordinator already has these findings in its”.",
          "<b>D. Enable prompt caching on the synthesis subagent to reduce the overhead of repeatedly transferring the same research findings.</b>: Bỏ qua yêu cầu chính “The coordinator already has these findings in its”."
        ]
      }
    },
    {
      "number": 42,
      "topic": 1,
      "type": "mcq",
      "question": "After the web search agent finds 25 sources (120K tokens of raw content), the document analysis agent extracts key insights (15K tokens), and the synthesis agent produces a coherent narrative draft (3K tokens), the coordinator must pass context to the report generation agent for the final output with proper source citations. What context-passing strategy provides the best balance of completeness and efficiency?",
      "options": [
        "Pass the full accumulated context from all prior agents.",
        "Pass the synthesis draft along with a structured source index that maps key claims to their source URLs and relevant excerpts.",
        "Pass a condensed summary of all prior stages that preserves the main findings and attributes them to sources by name only.",
        "Pass only the synthesis draft and have a separate post-processing pipeline match claims to sources and insert citations after the report is generated."
      ],
      "answers": [
        "Pass the synthesis draft along with a structured source index that maps key claims to their source URLs and relevant excerpts."
      ],
      "explanation": {
        "key": "<b>“After the web search agent finds 25 sources (120K tokens of”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Pass the synthesis draft along with a structured source index that”</b> <i>(trong đáp án B)</i>: Chuyển bản nháp tổng hợp (token 3K) + yêu cầu ánh xạ chỉ mục nguồn tới URL/đoạn trích…",
        "elimination": [
          "<b>A. Pass the full accumulated context from all prior agents.</b>: Cách này giữ quá nhiều dữ liệu không cần thiết, làm tăng token, độ trễ…",
          "<b>C. Pass a condensed summary of all prior stages that preserves the main findings and attributes them to sources by name only.</b>: Bash có thể thực hiện thao tác nhưng dễ vỡ và bỏ qua contract hoặc…",
          "<b>D. Pass only the synthesis draft and have a separate post-processing pipeline match claims to sources and insert citations after the report is generated.</b>: Bỏ qua yêu cầu chính “After the web search agent finds 25 sources”."
        ]
      }
    },
    {
      "number": 43,
      "topic": 1,
      "type": "mcq",
      "question": "When analyzing complex legal cases that cite multiple precedents, the document analysis subagent processes each sequentially. A landmark case citing 12 precedents takes over 3 minutes to analyze completely. What's the most effective way to reduce this latency while preserving the coordinator's ability to monitor and debug the system?",
      "options": [
        "Implement a message queue where precedent analysis tasks are processed asynchronously by a pool of worker agents.",
        "Create a recursive agent hierarchy where analysis agents subdivide work among child agents until reaching single-precedent granularity.",
        "Have the coordinator spawn parallel document analysis subagents, each handling a subset of precedents, then aggregate results before synthesis.",
        "Enable the document analysis subagent to spawn its own specialized subagents dynamically when it encounters cases with many citations."
      ],
      "answers": [
        "Have the coordinator spawn parallel document analysis subagents, each handling a subset of precedents, then aggregate results before synthesis."
      ],
      "explanation": {
        "key": "<b>“A landmark case citing 12 precedents takes over 3 minutes to”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Have the coordinator spawn parallel document analysis subagents, each handling a”</b> <i>(trong đáp án C)</i>: Các precedent có thể được chia thành những nhóm độc lập để phân tích song song.",
        "elimination": [
          "<b>A. Implement a message queue where precedent analysis tasks are processed asynchronously by a pool of worker agents.</b>: Bash có thể thực hiện thao tác nhưng dễ vỡ và bỏ qua contract hoặc…",
          "<b>B. Create a recursive agent hierarchy where analysis agents subdivide work among child agents until reaching single-precedent granularity.</b>: Bỏ qua yêu cầu chính “A landmark case citing 12 precedents takes over”.",
          "<b>D. Enable the document analysis subagent to spawn its own specialized subagents dynamically when it encounters cases with many citations.</b>: Bỏ qua yêu cầu chính “A landmark case citing 12 precedents takes over”."
        ]
      }
    },
    {
      "number": 44,
      "topic": 1,
      "type": "mcq",
      "question": "In production, you're distributing complex queries to specialized subagents. The query distribution is uneven and evolving as users discover new applications. What's the most effective approach to optimize for query complexity?",
      "options": [
        "Have the coordinator analyze each query dynamically and selectively route subagents based on the query's complexity and routing characteristics.",
        "Create a fast-track path for factual questions that bypasses subagents entirely, routing only analytical queries through the complete pipeline.",
        "Train a query complexity classifier based on labeled historical data to predict optimal subagent combination.",
        "Implement pattern-based routing that categorizes queries based on factual vs analytical patterns and maps each to a predefined subagent combination."
      ],
      "answers": [
        "Create a fast-track path for factual questions that bypasses subagents entirely, routing only analytical queries through the complete pipeline."
      ],
      "explanation": {
        "key": "<b>“uneven and evolving”</b> <i>(trong câu hỏi)</i>: Phân bố không đều xuất phát từ việc factual queries chiếm lượng lớn nhưng đang bị xử lý qua subagent không cần thiết.<br><b>“bypasses subagents entirely”</b> <i>(trong đáp án B)</i>: Fast-track loại bỏ overhead subagent cho queries không cần reasoning phức tạp — vừa cân bằng tải, vừa giảm độ trễ trực tiếp tại điểm nóng.",
        "elimination": [
          "<b>A. Have the coordinator analyze each query dynamically...</b>: Phân tích động tại coordinator vẫn phải routing qua subagent cho phần lớn truy vấn — không giải quyết được imbalance, chỉ thêm overhead.",
          "<b>C. Train a query complexity classifier...</b>: Cần dữ liệu lịch sử gán nhãn và quy trình retraining khi phân bố “evolving” — phức tạp hơn cần thiết so với fast-track.",
          "<b>D. Implement pattern-based routing...</b>: Pattern cố định không thích ứng với phân bố “evolving” — khi query types thay đổi, pattern lỗi thời gây mis-routing."
        ]
      }
    },
    {
      "number": 45,
      "topic": 1,
      "type": "mcq",
      "question": "The synthesis agent receives summarized findings from the web search and document analysis agents, then passes a consolidated summary to the report generator. During testing, you discover the generated reports make factual claims without proper citations–the report generator cannot attribute statements to their original sources because that metadata was lost during the summarization steps. What's the most effective approach to ensure proper source attribution in the final reports?",
      "options": [
        "Have the report generator query the web search agent to re-locate sources for claims in the final report.",
        "Instruct the synthesis agent to embed source references inline within its summary text using a consistent citation format.",
        "Have each agent output structured data separating content summaries from source metadata (URLs, document names, page numbers).",
        "Skip summarization and pass full raw outputs from web search and document analysis directly to the report generator."
      ],
      "answers": [
        "Have each agent output structured data separating content summaries from source metadata (URLs, document names, page numbers)."
      ],
      "explanation": {
        "key": "<b>“During testing, you discover the generated reports make factual claims without”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Have each agent output structured data separating content summaries from source”</b> <i>(trong đáp án C)</i>: Thay vì sửa lỗi phân bổ sau khi bị mất, mỗi agent cần xuất dữ liệu có cấu…",
        "elimination": [
          "<b>A. Have the report generator query the web search agent to re-locate sources for claims in the final report.</b>: Bỏ qua yêu cầu chính “During testing, you discover the generated reports make”.",
          "<b>B. Instruct the synthesis agent to embed source references inline within its summary text using a consistent citation format.</b>: Bỏ qua yêu cầu chính “During testing, you discover the generated reports make”.",
          "<b>D. Skip summarization and pass full raw outputs from web search and document analysis directly to the report generator.</b>: Cách này giữ quá nhiều dữ liệu không cần thiết, làm tăng token, độ trễ…"
        ]
      }
    },
    {
      "number": 46,
      "topic": 1,
      "type": "mcq",
      "question": "When implementing your lookup_order MCP tool, the backend sometimes returns errors (e.g., \"Order not found\" or temporary database failures). What is the correct pattern for communicating these errors back to the agent?",
      "options": [
        "Return the error message in the tool result content with the isError flag set to true",
        "Return a success response with a \"status\" field indicating the error type",
        "Log the error server-side and return an empty result to avoid confusing the model",
        "Throw an exception from the tool handler so the agent framework can catch and log it"
      ],
      "answers": [
        "Return the error message in the tool result content with the isError flag set to true"
      ],
      "explanation": {
        "key": "<b>“When implementing your lookup_order MCP tool, the backend sometimes returns errors”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Return the error message in the tool result content with the”</b> <i>(trong đáp án A)</i>: Mẫu thiết kế của MCP: đặt văn bản lỗi vào trường nội dung và đánh dấu isError=true.",
        "elimination": [
          "<b>B. Return a success response with a \"status\" field indicating the error type</b>: Che giấu lỗi hoặc trả kết quả rỗng làm agent không phân biệt được “không…",
          "<b>C. Log the error server-side and return an empty result to avoid confusing the model</b>: Che giấu lỗi hoặc trả kết quả rỗng làm agent không phân biệt được “không…",
          "<b>D. Throw an exception from the tool handler so the agent framework can catch and log it</b>: Exception của handler là lỗi thực thi phía server; agent cần nhận tool result có…"
        ]
      }
    },
    {
      "number": 47,
      "topic": 1,
      "type": "mcq",
      "question": "After investigating a billing dispute over 25+ turns, you've identified that duplicate charges occurred due to a payment gateway timeout triggering retry logic. The required refund ($847) exceeds your $500 authorization limit. You need to call escalate_to_human, and the human agent won't have access to your conversation transcript. What context should you pass to enable effective resolution?",
      "options": [
        "The customer's original complaint verbatim plus the tool result excerpts showing duplicate transactions.",
        "The complete conversation transcript with all tool results.",
        "Your diagnosis and the refund amount only.",
        "A structured summary: customer ID, root cause, refund amount, and recommended action."
      ],
      "answers": [
        "A structured summary: customer ID, root cause, refund amount, and recommended action."
      ],
      "explanation": {
        "key": "<b>“You need to call escalate_to_human, and the human agent won't have”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“A structured summary: customer ID, root cause, refund amount, and recommended”</b> <i>(trong đáp án D)</i>: Tác nhân con người cần có đủ thông tin để giải quyết nhanh chóng nhưng không cần toàn…",
        "elimination": [
          "<b>A. The customer's original complaint verbatim plus the tool result excerpts showing duplicate transactions.</b>: Bỏ qua yêu cầu chính “You need to call escalate_to_human, and the human”.",
          "<b>B. The complete conversation transcript with all tool results.</b>: Cách này giữ quá nhiều dữ liệu không cần thiết, làm tăng token, độ trễ…",
          "<b>C. Your diagnosis and the refund amount only.</b>: Bỏ qua yêu cầu chính “You need to call escalate_to_human, and the human”."
        ]
      }
    },
    {
      "number": 48,
      "topic": 1,
      "type": "mcq",
      "question": "Your agent has called lookup_order multiple times while investigating a customer's return requests. Each response includes 40+ fields (items, shipping details, payment info, status history). Tool outputs now represent the majority of the conversation's context. The customer mentions two more orders they want to discuss. What's the most effective approach before making additional lookups?",
      "options": [
        "Proceed with additional lookups without modifying the existing tool output context",
        "Move all tool responses to a vector database with semantic indexing, retrieving relevant portions as the conversation continues",
        "Have the model generate a natural language summary of each order's key details, replacing structured responses with prose descriptions",
        "Extract only return-relevant fields (items, purchase date, return window, status) from each existing order response, removing verbose details"
      ],
      "answers": [
        "Extract only return-relevant fields (items, purchase date, return window, status) from each existing order response, removing verbose details"
      ],
      "explanation": {
        "key": "<b>“Tool outputs now represent the majority of the conversation's context.”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Extract only return-relevant fields (items, purchase date, return window, status) from”</b> <i>(trong đáp án D)</i>: Khi kết quả đầu ra của công cụ chiếm phần lớn bối cảnh, bạn cần cắt bớt để…",
        "elimination": [
          "<b>A. Proceed with additional lookups without modifying the existing tool output context</b>: Bỏ qua yêu cầu chính “Tool outputs now represent the majority of the”.",
          "<b>B. Move all tool responses to a vector database with semantic indexing, retrieving relevant portions as the conversation continues</b>: Retrieval có thể hữu ích ở quy mô lớn nhưng bổ sung hạ tầng và…",
          "<b>C. Have the model generate a natural language summary of each order's key details, replacing structured responses with prose descriptions</b>: Bản tóm tắt văn xuôi có thể làm mất ID, con số hoặc trạng thái…"
        ]
      }
    },
    {
      "number": 49,
      "topic": 1,
      "type": "mcq",
      "question": "A customer sends: \"This is frustrating. I've explained my issue twice and nothing is being resolved. I want to talk to a real person NOW.\" The agent has not yet called any tools to investigate their account. What should the agent do?",
      "options": [
        "Immediately call escalate_to_human with the conversation history.",
        "Briefly explain what the agent can help with and offer to resolve the issue quickly, escalating only if the customer repeats their request.",
        "Acknowledge the frustration and ask one targeted question to understand the specific issue before escalating.",
        "First call get_customer and lookup_order to gather account context, then escalate to a human agent."
      ],
      "answers": [
        "Acknowledge the frustration and ask one targeted question to understand the specific issue before escalating."
      ],
      "explanation": {
        "key": "<b>“explained my issue twice and nothing is being resolved”</b> <i>(trong câu hỏi)</i>: Khách hàng đã giải thích 2 lần mà không được giải quyết — agent cần xác nhận đã nghe và hỏi đúng trọng tâm.<br><b>“ask one targeted question to understand the specific issue”</b> <i>(trong đáp án C)</i>: Acknowledge frustration trước + một câu hỏi cụ thể tránh lặp lại lần 3, giúp agent hoặc human sau tiếp nhận đầy đủ context để giải quyết dứt điểm.",
        "elimination": [
          "<b>A. Immediately call escalate_to_human with the conversation history.</b>: Escalate không có acknowledgment cắt đứt liên kết cảm xúc và bỏ qua cơ hội giải quyết ngay — khách đã nói 2 lần, human agent cũng cần context rõ hơn.",
          "<b>B. Briefly explain what the agent can help with...</b>: Giải thích năng lực của agent trong khi khách đang thất vọng làm tăng cọ xát — không acknowledge frustration trước là sai thứ tự ưu tiên.",
          "<b>D. First call get_customer and lookup_order...</b>: Thu thập dữ liệu trước khi acknowledge frustration làm khách đợi thêm — ưu tiên phải là acknowledge + hỏi đúng trọng tâm, không phải lookup ngay."
        ]
      }
    },
    {
      "number": 50,
      "topic": 1,
      "type": "mcq",
      "question": "You're implementing the escalation logic for when the agent should call escalate_to_human. Your team proposes four different approaches for triggering escalation. Which approach will most reliably identify cases that genuinely require human intervention?",
      "options": [
        "Instruct the agent to escalate when the customer requests a human, when the issue requires policy exceptions, or when the agent cannot make meaningful progress.",
        "Configure the agent to escalate after three consecutive tool calls that fail to resolve the customer's stated issue, ensuring a reasonable attempt before involving a human.",
        "Build a rules engine that maps specific issue types, customer segments, and product categories to escalation decisions, removing the need for model judgment calls.",
        "Implement sentiment analysis that monitors for frustration indicators (negative language, repeated questions, exclamation marks) and trigger escalation when the frustration score exceeds a configured threshold."
      ],
      "answers": [
        "Instruct the agent to escalate when the customer requests a human, when the issue requires policy exceptions, or when the agent cannot make meaningful progress."
      ],
      "explanation": {
        "key": "<b>“Your team proposes four different approaches for triggering escalation.”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Instruct the agent to escalate when the customer requests a human,”</b> <i>(trong đáp án A)</i>: Xác định các điều kiện báo cáo rõ ràng (khách hàng yêu cầu về con người, cần có…",
        "elimination": [
          "<b>B. Configure the agent to escalate after three consecutive tool calls that fail to resolve the customer's stated issue, ensuring a reasonable attempt before involving a human.</b>: Ngưỡng số lần gọi cố định là máy móc: có trường hợp phải chuyển giao…",
          "<b>C. Build a rules engine that maps specific issue types, customer segments, and product categories to escalation decisions, removing the need for model judgment calls.</b>: Rules engine cứng khó bao quát các tình huống mới và các ngoại lệ ngữ…",
          "<b>D. Implement sentiment analysis that monitors for frustration indicators (negative language, repeated questions, exclamation marks) and trigger escalation when the frustration score exceeds a configured threshold.</b>: Sentiment chỉ là tín hiệu gián tiếp; người dùng có thể cần human dù bình…"
        ]
      }
    },
    {
      "number": 51,
      "topic": 1,
      "type": "mcq",
      "question": "Your agent is handling a billing dispute. After calling get_customer and lookup_order, it identifies that the dispute involves a promotional pricing error requiring manager approval–beyond the agent's authorization level. How should the workflow handle this mid-process escalation?",
      "options": [
        "Attempt the refund with process_refund anyway, escalating only if the system rejects the transaction.",
        "Compile a structured handoff with customer details, order info, and the identified issue before calling escalate_to_human.",
        "Call escalate_to_human passing only the customer's original message.",
        "Persist the complete conversation and tool response history to a database, then call escalate_to_human with a reference ID."
      ],
      "answers": [
        "Compile a structured handoff with customer details, order info, and the identified issue before calling escalate_to_human."
      ],
      "explanation": {
        "key": "<b>“After calling get_customer and lookup_order, it identifies that the dispute involves”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Compile a structured handoff with customer details, order info, and the”</b> <i>(trong đáp án B)</i>: Việc chuyển lên cấp cao hơn giữa quá trình cần cung cấp đủ bối cảnh cho subagent người.",
        "elimination": [
          "<b>A. Attempt the refund with process_refund anyway, escalating only if the system rejects the transaction.</b>: Bỏ qua yêu cầu chính “After calling get_customer and lookup_order, it identifies that”.",
          "<b>C. Call escalate_to_human passing only the customer's original message.</b>: Bỏ qua yêu cầu chính “After calling get_customer and lookup_order, it identifies that”.",
          "<b>D. Persist the complete conversation and tool response history to a database, then call escalate_to_human with a reference ID.</b>: Bỏ qua yêu cầu chính “After calling get_customer and lookup_order, it identifies that”."
        ]
      }
    },
    {
      "number": 52,
      "topic": 1,
      "type": "mcq",
      "question": "During a billing dispute resolution, your agent successfully retrieves customer info via get_customer and order details via lookup_order, but when attempting to process the refund via process_refund, the tool returns a timeout error. The agent has enough information to explain the billing, confirm the refund eligibility, and verify refund eligibility, but cannot actually process the refund due to the backend failure. What approach best balances first-contact resolution with appropriate error handling?",
      "options": [
        "Escalate immediately to a human agent since the refund action cannot be completed",
        "Implement automatic retries with exponential backoff for process_refund, keeping the conversation open until the refund is successfully processed",
        "Confirm the refund will be processed and close the conversation, since the system has all necessary information to complete it automatically",
        "Explain the billing, confirm refund eligibility, acknowledge the system issue preventing immediate processing, and offer escalation or retry later"
      ],
      "answers": [
        "Explain the billing, confirm refund eligibility, acknowledge the system issue preventing immediate processing, and offer escalation or retry later"
      ],
      "explanation": {
        "key": "<b>“The agent has enough information to explain the billing, confirm the”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Explain the billing, confirm refund eligibility, acknowledge the system issue preventing”</b> <i>(trong đáp án D)</i>: Cung cấp một phần giá trị mà bạn có thể (giải thích + tính đủ điều kiện), thành…",
        "elimination": [
          "<b>A. Escalate immediately to a human agent since the refund action cannot be completed</b>: Bỏ qua yêu cầu chính “The agent has enough information to explain the”.",
          "<b>B. Implement automatic retries with exponential backoff for process_refund, keeping the conversation open until the refund is successfully processed</b>: Bash có thể thực hiện thao tác nhưng dễ vỡ và bỏ qua contract hoặc…",
          "<b>C. Confirm the refund will be processed and close the conversation, since the system has all necessary information to complete it automatically</b>: Bash có thể thực hiện thao tác nhưng dễ vỡ và bỏ qua contract hoặc…"
        ]
      }
    },
    {
      "number": 53,
      "topic": 1,
      "type": "mcq",
      "question": "Production logs reveal inconsistent error responses when lookup_order fails. The agent sometimes retries (wasting 3-4 turns) before concluding on the error. Your MCP tool currently returns only a plain text error message to Claude. What's the most effective improvement?",
      "options": [
        "Implement retry logic with exponential backoff in your MCP server for all errors, returning only successful results to the agent.",
        "Create an analyze_error MCP tool the agent calls to determine the error type before deciding how to handle it.",
        "Return structured error responses with retryable: false for business errors and a customer-friendly explanation for Claude to use.",
        "Add few-shot examples to the system prompt showing how to distinguish retryable from non-retryable errors by parsing error message text."
      ],
      "answers": [
        "Return structured error responses with retryable: false for business errors and a customer-friendly explanation for Claude to use."
      ],
      "explanation": {
        "key": "<b>“Your MCP tool currently returns only a plain text error message”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Return structured error responses with retryable: false for business errors and”</b> <i>(trong đáp án C)</i>: Khi công cụ chỉ trả về văn bản thuần túy, agent không thể phân biệt lỗi tạm thời…",
        "elimination": [
          "<b>A. Implement retry logic with exponential backoff in your MCP server for all errors, returning only successful results to the agent.</b>: Retry có thể che bớt lỗi tạm thời nhưng không cung cấp cho agent loại…",
          "<b>B. Create an analyze_error MCP tool the agent calls to determine the error type before deciding how to handle it.</b>: Bỏ qua yêu cầu chính “Your MCP tool currently returns only a plain”.",
          "<b>D. Add few-shot examples to the system prompt showing how to distinguish retryable from non-retryable errors by parsing error message text.</b>: Bổ sung hướng dẫn chung có thể cải thiện phần nào nhưng không làm rõ…"
        ]
      }
    },
    {
      "number": 54,
      "topic": 1,
      "type": "mcq",
      "question": "When the agent calls lookup_order and receives order details showing the item was purchased 45 days ago, how does the agentic loop determine whether to call process_refund or escalate_to_human next?",
      "options": [
        "The agent executes the remaining steps in a tool sequence planned at the start of the request.",
        "The agent follows a pre-configured decision tree mapping order attributes to specific tool calls.",
        "The order details are added to the conversation and the model reasons about which action to take.",
        "The orchestration layer automatically routes to the next tool based on the order's status field."
      ],
      "answers": [
        "The order details are added to the conversation and the model reasons about which action to take."
      ],
      "explanation": {
        "key": "<b>“When the agent calls lookup_order and receives order details showing the”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“The order details are added to the conversation and the model”</b> <i>(trong đáp án C)</i>: Trong vòng lặp agent của Claude, sau khi công cụ trả về kết quả, chi tiết đơn hàng…",
        "elimination": [
          "<b>A. The agent executes the remaining steps in a tool sequence planned at the start of the request.</b>: Bỏ qua yêu cầu chính “When the agent calls lookup_order and receives order”.",
          "<b>B. The agent follows a pre-configured decision tree mapping order attributes to specific tool calls.</b>: Bỏ qua yêu cầu chính “When the agent calls lookup_order and receives order”.",
          "<b>D. The orchestration layer automatically routes to the next tool based on the order's status field.</b>: Bash có thể thực hiện thao tác nhưng dễ vỡ và bỏ qua contract hoặc…"
        ]
      }
    },
    {
      "number": 55,
      "topic": 1,
      "type": "mcq",
      "question": "A customer writes: \"I've been going back and forth on this return for days. I just want to speak to someone who can actually help me.\" The agent has confirmed via lookup_order that the return is straightforward–within policy and eligible for immediate processing. What should the agent do?",
      "options": [
        "Process the refund via process_refund to resolve the underlying issue, then inform them it's complete",
        "Ask what specifically hasn't worked in previous attempts before deciding whether to escalate or resolve automatically",
        "Acknowledge frustration, inform them this is resolvable now, and offer to complete it or escalate",
        "Call escalate_to_human immediately to honor the customer's request"
      ],
      "answers": [
        "Acknowledge frustration, inform them this is resolvable now, and offer to complete it or escalate"
      ],
      "explanation": {
        "key": "<b>“I just want to speak to someone who can actually help”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Acknowledge frustration, inform them this is resolvable now, and offer to”</b> <i>(trong đáp án C)</i>: Trả lại hàng đủ điều kiện và có thể được xử lý ngay lập tức, nhưng khách hàng…",
        "elimination": [
          "<b>A. Process the refund via process_refund to resolve the underlying issue, then inform them it's complete</b>: Bỏ qua yêu cầu chính “I just want to speak to someone who”.",
          "<b>B. Ask what specifically hasn't worked in previous attempts before deciding whether to escalate or resolve automatically</b>: Bỏ qua yêu cầu chính “I just want to speak to someone who”.",
          "<b>D. Call escalate_to_human immediately to honor the customer's request</b>: Bỏ qua yêu cầu chính “I just want to speak to someone who”."
        ]
      }
    },
    {
      "number": 56,
      "topic": 1,
      "type": "mcq",
      "question": "Compliance requires that refunds exceeding $500 must automatically escalate to a human agent–this rule cannot be left to model discretion. Despite clear system prompt instructions, production logs show the agent occasionally processes high-value refunds directly (3% failure rate). How should you achieve guaranteed compliance?",
      "options": [
        "Implement a hook to intercept tool calls; when the refund process amount exceeds $500, block it and invoke human escalation.",
        "Strengthen the system prompt with emphatic language: \"CRITICAL POLICY: Refunds over $500 MUST trigger human escalation. NEVER process these directly.\"",
        "Modify the refund tool to return an error with message \"Amount exceeds policy limit–please escalate\" when threshold is exceeded.",
        "Add few-shot examples to the prompt showing correct escalation behavior at various refund amounts ($400, $500, $600)."
      ],
      "answers": [
        "Implement a hook to intercept tool calls; when the refund process amount exceeds $500, block it and invoke human escalation."
      ],
      "explanation": {
        "key": "<b>“Compliance requires that refunds exceeding $500 must automatically escalate to a”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Implement a hook to intercept tool calls; when the refund process”</b> <i>(trong đáp án A)</i>: Khi việc tuân thủ là bắt buộc và không thể tùy ý lập mô hình, thì biện pháp…",
        "elimination": [
          "<b>B. Strengthen the system prompt with emphatic language: \"CRITICAL POLICY: Refunds over $500 MUST trigger human escalation. NEVER process these directly.\"</b>: Prompt và ví dụ chỉ định hướng hành vi xác suất; chúng không thể bảo…",
          "<b>C. Modify the refund tool to return an error with message \"Amount exceeds policy limit–please escalate\" when threshold is exceeded.</b>: Bỏ qua yêu cầu chính “Compliance requires that refunds exceeding $500 must automatically”.",
          "<b>D. Add few-shot examples to the prompt showing correct escalation behavior at various refund amounts ($400, $500, $600).</b>: Prompt và ví dụ chỉ định hướng hành vi xác suất; chúng không thể bảo…"
        ]
      }
    },
    {
      "number": 57,
      "topic": 1,
      "type": "mcq",
      "question": "A customer raises three separate issues during one session: a refund inquiry (turns 1-15), a subscription question (turns 16-30), and a payment method update (turns 31-45). At turn 48, the customer asks \"What happened with my refund?\" The conversation is approaching context limits. What strategy best maintains the agent's ability to address all issues throughout the session?",
      "options": [
        "Extract and persist structured issue data (order IDs, amounts, statuses) into a separate context layer.",
        "Rely on MCP tools to re-fetch relevant information on demand when the customer references earlier issues.",
        "Implement sliding window context that retains the most recent 30 turns.",
        "Summarize earlier turns into a narrative description, preserving full message history only for the active issue."
      ],
      "answers": [
        "Summarize earlier turns into a narrative description, preserving full message history only for the active issue."
      ],
      "explanation": {
        "key": "<b>“approaching context limits”</b> <i>(trong câu hỏi)</i>: Context window sắp đầy, cần chiến lược nén thông tin mà vẫn giữ được tính liên tục của ba issue riêng biệt.<br><b>“narrative description, preserving full message history only for the most recent issue”</b> <i>(trong đáp án D)</i>: Narrative summary nén context hiệu quả — giữ nguyên turns gần nhất (active issue) còn các issue trước được tóm tắt mà không mất thông tin quan trọng.",
        "elimination": [
          "<b>A. Extract and persist structured issue data into a separate context window...</b>: Structured data (order IDs, amounts) không thay thế được ngữ cảnh hội thoại — agent mất khả năng hiểu lý do và tình trạng đằng sau các số liệu.",
          "<b>B. Rely on MCP tools to re-fetch relevant information on demand...</b>: Tools có thể lấy trạng thái backend hiện tại nhưng không khôi phục được lịch sử trao đổi và context đã thỏa thuận với khách.",
          "<b>C. Implement sliding window retaining the most recent 30 turns.</b>: Refund inquiry ở turns 1–15 sẽ bị cắt khi sliding window chỉ giữ 30 turns trong session dài — mất issue đã xử lý một phần."
        ]
      }
    },
    {
      "number": 58,
      "topic": 1,
      "type": "mcq",
      "question": "The agent verifies customer identity through a multi-step process before resetting passwords. During testing, you notice that after the customer answers the third verification question, the agent asks them to provide their name again, as if the earlier exchange never happened. What's the most likely cause of this behavior?",
      "options": [
        "The prompt lacks instructions telling Claude to remember information across multiple exchanges.",
        "The verification tool is clearing the agent's internal state after each successful validation step.",
        "Claude's memory retention is limited to two conversational turns by default, requiring explicit configuration to extend it.",
        "The conversation history isn't being passed in subsequent API requests."
      ],
      "answers": [
        "The conversation history isn't being passed in subsequent API requests."
      ],
      "explanation": {
        "key": "<b>“During testing, you notice that after the customer answers the third”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“The conversation history isn't being passed in subsequent API requests.”</b> <i>(trong đáp án D)</i>: Claude không có bộ nhớ vốn có giữa các lệnh gọi API.",
        "elimination": [
          "<b>A. The prompt lacks instructions telling Claude to remember information across multiple exchanges.</b>: Bỏ qua yêu cầu chính “During testing, you notice that after the customer”.",
          "<b>B. The verification tool is clearing the agent's internal state after each successful validation step.</b>: Bỏ qua yêu cầu chính “During testing, you notice that after the customer”.",
          "<b>C. Claude's memory retention is limited to two conversational turns by default, requiring explicit configuration to extend it.</b>: Bỏ qua yêu cầu chính “During testing, you notice that after the customer”."
        ]
      }
    },
    {
      "number": 59,
      "topic": 1,
      "type": "mcq",
      "question": "Your process_refund tool returns two types of errors: technical errors (\"503 Service Unavailable\", \"Connection timeout\") that are transient (5% of calls), and business errors (\"Order exceeds 30-day return window\", \"Item already refunded\") that are permanent (12% of calls). Monitoring shows the agent wastes 3-4 turns retrying business errors that can never succeed. Currently, both error types return only a plain text message to Claude. What's the most effective way to reduce wasted retries while improving customer-facing response quality?",
      "options": [
        "Add few-shot examples showing how to distinguish retryable from non-retryable errors by parsing error message text.",
        "Return structured error responses with retryable: false for business errors and a customer-friendly explanation for Claude to use.",
        "Implement automatic retry logic at the tool level for technical errors only, passing business errors to Claude without retries.",
        "Add a check_refund_eligibility tool that must be called before process_refund to prevent business rule violations."
      ],
      "answers": [
        "Return structured error responses with retryable: false for business errors and a customer-friendly explanation for Claude to use."
      ],
      "explanation": {
        "key": "<b>“Currently, both error types return only a plain text message to”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Return structured error responses with retryable: false for business errors and”</b> <i>(trong đáp án B)</i>: Việc thêm cờ có thể thử lại: sai vào các lỗi kinh doanh cho phép Claude biết ngay…",
        "elimination": [
          "<b>A. Add few-shot examples showing how to distinguish retryable from non-retryable errors by parsing error message text.</b>: Retry không thể tạo ra dữ liệu còn thiếu hoặc sửa lỗi validation, permission hay…",
          "<b>C. Implement automatic retry logic at the tool level for technical errors only, passing business errors to Claude without retries.</b>: Retry không thể tạo ra dữ liệu còn thiếu hoặc sửa lỗi validation, permission hay…",
          "<b>D. Add a check_refund_eligibility tool that must be called before process_refund to prevent business rule violations.</b>: Bỏ qua yêu cầu chính “Currently, both error types return only a plain”."
        ]
      }
    },
    {
      "number": 60,
      "topic": 1,
      "type": "mcq",
      "question": "A customer returns 4 hours after their initial session about the same billing dispute. The previous 32-turn session contains context: lookup_status_result messages containing \"Status: Pending Refund\" and significant tokens from prior lookup results. The agent needs to be prepared to answer the customer fully. What approach most reliably handles returning customers?",
      "options": [
        "Start a new session, inject a structured summary of the previous interaction (issue type, resolution steps, current status), then make fresh tool calls as needed.",
        "Resume with the full conversation and add a system prompt instruction that instructs the agent to prioritize resolving the pending refund.",
        "Resume with state and configure the agent to automatically re-call all previous tool_results messages to ensure data freshness.",
        "Resume the previous session with the full history and ask the customer to restate the dispute before deciding whether fresh lookups are necessary."
      ],
      "answers": [
        "Start a new session, inject a structured summary of the previous interaction (issue type, resolution steps, current status), then make fresh tool calls as needed."
      ],
      "explanation": {
        "key": "<b>“returns 4 hours after their initial session”</b> <i>(trong câu hỏi)</i>: Sau một khoảng gián đoạn, trạng thái refund có thể đã thay đổi nên tool result cũ không…<br><b>“significant tokens from prior lookup results”</b> <i>(trong câu hỏi)</i>: Nạp lại toàn bộ session làm tăng context mà không bảo đảm dữ liệu vẫn mới.",
        "elimination": [
          "<b>B. Resume with the full conversation...</b>: System prompt mới không làm cho các tool result cũ trở thành dữ liệu hiện…",
          "<b>C. ...automatically re-call all previous tool_results...</b>: Gọi lại mọi tool một cách máy móc có thể tốn thời gian và tạo…",
          "<b>D. ...ask the customer to restate the dispute...</b>: Bắt khách hàng lặp lại thông tin đã có làm tăng ma sát và vẫn…"
        ]
      }
    },
    {
      "number": 61,
      "topic": 1,
      "type": "mcq",
      "question": "Your extraction pipeline processes invoices and extracts line items, subtotals, tax amounts, and grand totals. During evaluation, you discover that in 18% of extractions, the sum of extracted line item amounts doesn't match the extracted grand total—sometimes due to OCR errors in the source document, sometimes due to extraction mistakes by the model. Downstream accounting systems reject records with mismatched totals. What's the most effective approach to improve extraction reliability?",
      "options": [
        "Add few-shot examples demonstrating invoices where extracted line items sum correctly to the stated total, encouraging the model to produce mathematically consistent extractions.",
        "Implement post-processing that automatically adjusts line item amounts proportionally when their sum doesn't match the stated total.",
        "Extract line items and totals independently, then use a separate validation model to reconcile discrepancies by determining which extracted values are most likely correct.",
        "Add a \"calculated_total\" field where the model sums extracted line items alongside a \"stated_total\" field. Flag records for human review when values differ."
      ],
      "answers": [
        "Add a \"calculated_total\" field where the model sums extracted line items alongside a \"stated_total\" field. Flag records for human review when values differ."
      ],
      "explanation": {
        "key": "<b>“Downstream accounting systems reject records with mismatched totals.”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Add a \"calculated_total\" field where the model sums extracted line items”</b> <i>(trong đáp án D)</i>: Việc ghi lại cả tổng_tổng_tính và tổng_tổng_đã nêu biến sự khác biệt thành tín hiệu hạng nhất …",
        "elimination": [
          "<b>A. Add few-shot examples demonstrating invoices where extracted line items sum correctly to the stated total, encouraging the model to produce mathematically consistent extractions.</b>: Bỏ qua yêu cầu chính “Downstream accounting systems reject records with mismatched totals”.",
          "<b>B. Implement post-processing that automatically adjusts line item amounts proportionally when their sum doesn't match the stated total.</b>: Tự sửa số liệu để làm chúng khớp nhau có thể che giấu OCR hoặc…",
          "<b>C. Extract line items and totals independently, then use a separate validation model to reconcile discrepancies by determining which extracted values are most likely correct.</b>: Bỏ qua yêu cầu chính “Downstream accounting systems reject records with mismatched totals”."
        ]
      }
    },
    {
      "number": 62,
      "topic": 1,
      "type": "mcq",
      "question": "An engineer asks your agent to identify untested code paths in a legacy payment processing module spanning 45 files. After reading the first 8 source files, the agent's responses are becoming noticeably less accurate — it's forgetting previously discussed code patterns and hasn't yet located all test files or traced critical payment flows. What's the most effective approach to complete this investigation?",
      "options": [
        "Clear context with /clear, then selectively re-read only the most critical files discovered so far, writing key findings to a scratchpad file that persists between context resets.",
        "Spawn subagents to investigate specific questions (e.g., \"find all test files for payment processing\", \"trace refund flow dependencies\") while the main agent coordinates findings and preserves high-level understanding.",
        "Document all current findings in a summary report, clear context completely, then use that report as the sole reference for continuing the investigation.",
        "Switch to using Grep to search for specific function names instead of reading full files, reducing the content loaded into context for remaining exploration."
      ],
      "answers": [
        "Spawn subagents to investigate specific questions (e.g., \"find all test files for payment processing\", \"trace refund flow dependencies\") while the main agent coordinates findings and preserves high-level understanding."
      ],
      "explanation": {
        "key": "<b>“After reading the first 8 source files, the agent's responses are”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Spawn subagents to investigate specific questions (e.g., \"find all test files”</b> <i>(trong đáp án B)</i>: Cách tiếp cận mạnh mẽ nhất là giao các cuộc điều tra có phạm vi phù hợp cho…",
        "elimination": [
          "<b>A. Clear context with /clear, then selectively re-read only the most critical files discovered so far, writing key findings to a scratchpad file that persists between context resets.</b>: Bắt đầu lại làm mất phần context đã tích lũy và buộc hệ thống lặp…",
          "<b>C. Document all current findings in a summary report, clear context completely, then use that report as the sole reference for continuing the investigation.</b>: Bắt đầu lại làm mất phần context đã tích lũy và buộc hệ thống lặp…",
          "<b>D. Switch to using Grep to search for specific function names instead of reading full files, reducing the content loaded into context for remaining exploration.</b>: Bỏ qua yêu cầu chính “After reading the first 8 source files, the”."
        ]
      }
    },
    {
      "number": 63,
      "topic": 1,
      "type": "mcq",
      "question": "The coordinator agent has AgentDefinitions configured for all four specialized subagents, each with appropriate descriptions, prompts, and tool restrictions. During testing, you notice the coordinator correctly reasons about when to delegate — it generates messages like \"I'll ask the web search agent to find sources on this topic\" — but no subagent execution ever occurs. The coordinator then proceeds as if the delegation happened and continues with incomplete information. Logs show no errors. What is the most likely cause?",
      "options": [
        "Subagent context isolation means task descriptions from the coordinator don't automatically reach subagents; you need to configure explicit context forwarding in ClaudeAgentOptions.",
        "The AgentDefinitions are configured correctly, but the coordinator's system prompt doesn't explicitly list the available subagent types, preventing the model from knowing they can be invoked.",
        "The coordinator's max_tokens setting is too low, causing the Task tool invocation to be truncated before the subagent type parameter can be specified.",
        "The coordinator's allowedTools configuration doesn't include \"Task\", so while it can reason about delegation, it cannot invoke the tool required to spawn subagents."
      ],
      "answers": [
        "The coordinator's allowedTools configuration doesn't include \"Task\", so while it can reason about delegation, it cannot invoke the tool required to spawn subagents."
      ],
      "explanation": {
        "key": "<b>“During testing, you notice the coordinator correctly reasons about when to”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“The coordinator's allowedTools configuration doesn't include \"Task\", so while it can”</b> <i>(trong đáp án D)</i>: Nếu không có công cụ Tác vụ trong allowTools, coordinator có thể nói về việc ủy quyền nhưng…",
        "elimination": [
          "<b>A. Subagent context isolation means task descriptions from the coordinator don't automatically reach subagents; you need to configure explicit context forwarding in ClaudeAgentOptions.</b>: Bỏ qua yêu cầu chính “During testing, you notice the coordinator correctly reasons”.",
          "<b>B. The AgentDefinitions are configured correctly, but the coordinator's system prompt doesn't explicitly list the available subagent types, preventing the model from knowing they can be invoked.</b>: Bỏ qua yêu cầu chính “During testing, you notice the coordinator correctly reasons”.",
          "<b>C. The coordinator's max_tokens setting is too low, causing the Task tool invocation to be truncated before the subagent type parameter can be specified.</b>: Bỏ qua yêu cầu chính “During testing, you notice the coordinator correctly reasons”."
        ]
      }
    },
    {
      "number": 64,
      "topic": 1,
      "type": "mcq",
      "question": "In production, you observe that simple fact-checking queries (e.g., \"What year was the Paris Climate Agreement signed?\") traverse all four subagents sequentially, consuming 40+ seconds and significant tokens per query. Complex comparative research benefits from the full pipeline. Your query distribution is diverse and evolving as users discover new applications. What's the most effective approach to optimize for varying query complexity?",
      "options": [
        "Have the coordinator analyze each query and dynamically decide which subagents to invoke based on its assessment of query requirements.",
        "Train a query complexity classifier on labeled historical data to predict optimal subagent combinations, retraining periodically as query patterns evolve.",
        "Create a fast-path for factual questions that bypasses subagents entirely, routing all other queries through the complete pipeline to ensure research thoroughness.",
        "Implement pattern-based routing that categorizes queries by structure (single-fact vs. comparative vs. analytical) and maps each category to a predefined subagent combination."
      ],
      "answers": [
        "Have the coordinator analyze each query and dynamically decide which subagents to invoke based on its assessment of query requirements."
      ],
      "explanation": {
        "key": "<b>“In production, you observe that simple fact-checking queries (e.g., \"What year”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Have the coordinator analyze each query and dynamically decide which subagents”</b> <i>(trong đáp án A)</i>: Hãy để coordinator LLM suy luận độc lập về từng truy vấn và chỉ chọn các subagent thực…",
        "elimination": [
          "<b>B. Train a query complexity classifier on labeled historical data to predict optimal subagent combinations, retraining periodically as query patterns evolve.</b>: Bỏ qua yêu cầu chính “In production, you observe that simple fact-checking queries”.",
          "<b>C. Create a fast-path for factual questions that bypasses subagents entirely, routing all other queries through the complete pipeline to ensure research thoroughness.</b>: Bỏ qua yêu cầu chính “In production, you observe that simple fact-checking queries”.",
          "<b>D. Implement pattern-based routing that categorizes queries by structure (single-fact vs. comparative vs. analytical) and maps each category to a predefined subagent combination.</b>: Bash có thể thực hiện thao tác nhưng dễ vỡ và bỏ qua contract hoặc…"
        ]
      }
    },
    {
      "number": 65,
      "topic": 1,
      "type": "mcq",
      "question": "Production logs reveal inconsistent error handling: when lookup_order fails, the agent sometimes retries 5+ times (wasteful when the order ID doesn't exist), sometimes escalates immediately (premature for temporary network issues), and sometimes asks users for clarification (inappropriate when the issue is a backend permission error). Investigation shows your MCP tool returns uniform error responses: {\"isError\": true, \"content\": [{\"type\": \"text\", \"text\": \"Operation failed\"}]}. The agent cannot distinguish between error types. What's the most effective improvement?",
      "options": [
        "Create an analyze_error MCP tool the agent calls after any failure to determine the error category and recommended action.",
        "Enhance error responses with structured metadata: include errorCategory (transient/validation/permission), isRetryable boolean, and a description of what caused the failure.",
        "Add few-shot examples to the system prompt demonstrating how to interpret error message patterns and select appropriate responses for each.",
        "Implement retry logic with exponential backoff in your MCP server for all errors, returning to the agent only after retries are exhausted."
      ],
      "answers": [
        "Enhance error responses with structured metadata: include errorCategory (transient/validation/permission), isRetryable boolean, and a description of what caused the failure."
      ],
      "explanation": {
        "key": "<b>“The agent cannot distinguish between error types.”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Enhance error responses with structured metadata: include errorCategory (transient/validation/permission), isRetryable boolean,”</b> <i>(trong đáp án B)</i>: Tool result hiện chỉ nói “Operation failed”, nên agent không biết nên retry, hỏi lại hay escalate.",
        "elimination": [
          "<b>A. Create an analyze_error MCP tool the agent calls after any failure to determine the error category and recommended action.</b>: Bỏ qua yêu cầu chính “The agent cannot distinguish between error types”.",
          "<b>C. Add few-shot examples to the system prompt demonstrating how to interpret error message patterns and select appropriate responses for each.</b>: Bổ sung hướng dẫn chung có thể cải thiện phần nào nhưng không làm rõ…",
          "<b>D. Implement retry logic with exponential backoff in your MCP server for all errors, returning to the agent only after retries are exhausted.</b>: Retry không thể tạo ra dữ liệu còn thiếu hoặc sửa lỗi validation, permission hay…"
        ]
      }
    },
    {
      "number": 66,
      "topic": 1,
      "type": "mcq",
      "question": "Users report that final reports sometimes lack depth on specific subtopics. Investigation shows that the document analysis agent frequently identifies gaps—for instance, noting \"the retrieved sources discuss API authentication but lack details on token refresh patterns\"—but under the current strict pipeline, this insight isn't actionable since search has already completed. What's the most effective architectural change?",
      "options": [
        "Have the synthesis agent attach confidence scores to each section and flag areas with insufficient coverage for manual review.",
        "Have the analysis agent report specific gaps to the coordinator, which triggers targeted searches and re-invokes analysis until sufficient.",
        "Add a research planning agent before the search phase that decomposes topics into specific sub- questions.",
        "Have the coordinator review analysis output for gap indicators and re-invoke search with gapinformed queries when gaps are detected."
      ],
      "answers": [
        "Have the analysis agent report specific gaps to the coordinator, which triggers targeted searches and re-invokes analysis until sufficient."
      ],
      "explanation": {
        "key": "<b>“Investigation shows that the document analysis agent frequently identifies gaps—for instance,”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Have the analysis agent report specific gaps to the coordinator, which”</b> <i>(trong đáp án B)</i>: Vấn đề cốt lõi là quy trình một chiều cứng nhắc, nơi những hiểu biết sâu sắc về…",
        "elimination": [
          "<b>A. Have the synthesis agent attach confidence scores to each section and flag areas with insufficient coverage for manual review.</b>: Chuyển thẳng sang review thủ công chỉ xử lý hậu quả và không giảm tỷ…",
          "<b>C. Add a research planning agent before the search phase that decomposes topics into specific sub- questions.</b>: Bỏ qua yêu cầu chính “Investigation shows that the document analysis agent frequently”.",
          "<b>D. Have the coordinator review analysis output for gap indicators and re-invoke search with gapinformed queries when gaps are detected.</b>: Bỏ qua yêu cầu chính “Investigation shows that the document analysis agent frequently”."
        ]
      }
    },
    {
      "number": 67,
      "topic": 1,
      "type": "mcq",
      "question": "This currently requires manually copy-pasting content into conversations. The team wants the agent to access this standard Jira ticket data directly. What's the most effective approach?",
      "options": [
        "Use the Bash tool with curl to call Jira's REST API, including authentication headers and parsing JSON responses inline.",
        "Build a custom MCP server wrapping Jira's API with tools designed specifically for this team's code review workflow.",
        "Integrate an existing Jira MCP server that exposes tickets, comments, and metadata through discoverable tool interfaces.",
        "Export Jira tickets to markdown files in the repository that the agent accesses using the Read tool."
      ],
      "answers": [
        "Integrate an existing Jira MCP server that exposes tickets, comments, and metadata through discoverable tool interfaces."
      ],
      "explanation": {
        "key": "<b>“This currently requires manually copy-pasting content into conversations.”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Integrate an existing Jira MCP server that exposes tickets, comments, and”</b> <i>(trong đáp án C)</i>: Đối với dữ liệu dịch vụ tiêu chuẩn của bên thứ ba như vé Jira, cách thực hành…",
        "elimination": [
          "<b>A. Use the Bash tool with curl to call Jira's REST API, including authentication headers and parsing JSON responses inline.</b>: Bash có thể thực hiện thao tác nhưng dễ vỡ và bỏ qua contract hoặc…",
          "<b>B. Build a custom MCP server wrapping Jira's API with tools designed specifically for this team's code review workflow.</b>: Bỏ qua yêu cầu chính “This currently requires manually copy-pasting content into conversations”.",
          "<b>D. Export Jira tickets to markdown files in the repository that the agent accesses using the Read tool.</b>: Bỏ qua yêu cầu chính “This currently requires manually copy-pasting content into conversations”."
        ]
      }
    },
    {
      "number": 68,
      "topic": 1,
      "type": "mcq",
      "question": "A critical bug is affecting production users. Error logs show exceptions in the OrderProcessing module with a clear stack trace pointing to a specific area, but you haven't worked with this module before. What's the most effective approach?",
      "options": [
        "Use direct execution to examine the stack trace, read the relevant code, and implement a fix once you identify the root cause.",
        "Use plan mode to analyze the error in context of the module's design, enumerate potential root causes, and prioritize fixes systematically.",
        "Start with direct execution to gather initial information, then switch to plan mode to design a comprehensive solution before implementing.",
        "Enter plan mode to explore the module's architecture and dependencies before attempting any fix."
      ],
      "answers": [
        "Use direct execution to examine the stack trace, read the relevant code, and implement a fix once you identify the root cause."
      ],
      "explanation": {
        "key": "<b>“Error logs show exceptions in the OrderProcessing module with a clear”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Use direct execution to examine the stack trace, read the relevant”</b> <i>(trong đáp án A)</i>: Việc gỡ lỗi có tính thích ứng — mỗi tệp bạn đọc sẽ thay đổi bước tiếp theo…",
        "elimination": [
          "<b>B. Use plan mode to analyze the error in context of the module's design, enumerate potential root causes, and prioritize fixes systematically.</b>: Bỏ qua yêu cầu chính “Error logs show exceptions in the OrderProcessing module”.",
          "<b>C. Start with direct execution to gather initial information, then switch to plan mode to design a comprehensive solution before implementing.</b>: Bỏ qua yêu cầu chính “Error logs show exceptions in the OrderProcessing module”.",
          "<b>D. Enter plan mode to explore the module's architecture and dependencies before attempting any fix.</b>: Bỏ qua yêu cầu chính “Error logs show exceptions in the OrderProcessing module”."
        ]
      }
    },
    {
      "number": 69,
      "topic": 1,
      "type": "mcq",
      "question": "After deploying the automated review, you notice high precision but low recall — real bugs are slipping through undetected. Investigation reveals your review prompt instructs Claude to \"only report high- confidence issues you are certain about\" and \"err on the side of not commenting.\" Developers appreciate the low noise, but a race condition that caused a production outage was visible in a reviewed PR and went unreported. You need to substantially improve bug detection while keeping false positive rates manageable for your team. What is the most effective approach?",
      "options": [
        "Split the review into a finding stage where Claude's goal is coverage — flagging every potential issue with confidence and severity metadata — and a separate stage that thresholds those findings.",
        "Add detailed few-shot examples demonstrating bug categories Claude should flag — race conditions, null dereferences, error handling gaps — while keeping the high-confidence filtering instruction to maintain current precision levels.",
        "Remove the conservative filtering instructions and prompt Claude to report all potential issues, then apply a programmatic filter to deduplicate and suppress categories that historically generate false positives.",
        "Expand the context window by including related test files, recent git history, and the module's dependency graph alongside the diff, giving Claude richer signals to assess issue severity."
      ],
      "answers": [
        "Split the review into a finding stage where Claude's goal is coverage — flagging every potential issue with confidence and severity metadata — and a separate stage that thresholds those findings."
      ],
      "explanation": {
        "key": "<b>“You need to substantially improve bug detection while keeping false positive”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Split the review into a finding stage where Claude's goal is”</b> <i>(trong đáp án A)</i>: tách phạm vi đưa tin ra khỏi quá trình lọc.",
        "elimination": [
          "<b>B. Add detailed few-shot examples demonstrating bug categories Claude should flag — race conditions, null dereferences, error handling gaps — while keeping the high-confidence filtering instruction to maintain current precision levels.</b>: Bỏ qua yêu cầu chính “You need to substantially improve bug detection while”.",
          "<b>C. Remove the conservative filtering instructions and prompt Claude to report all potential issues, then apply a programmatic filter to deduplicate and suppress categories that historically generate false positives.</b>: Bỏ qua yêu cầu chính “You need to substantially improve bug detection while”.",
          "<b>D. Expand the context window by including related test files, recent git history, and the module's dependency graph alongside the diff, giving Claude richer signals to assess issue severity.</b>: Bỏ qua yêu cầu chính “You need to substantially improve bug detection while”."
        ]
      }
    },
    {
      "number": 70,
      "topic": 1,
      "type": "mcq",
      "question": "Your remove_team_member tool uses a dry_run: boolean parameter for previewing impacts before execution. Production monitoring shows the agent bypasses the preview step in 15% of calls by calling with dry_run=false directly. You need to ensure every removal is preceded by a preview that the user explicitly confirms. What is the most reliable approach?",
      "options": [
        "Add detailed instructions and few-shot examples to the tool description requiring the agent to always call with dry_run=true first and wait for user confirmation before calling with dry_run=false.",
        "Annotate the tool as requiring confirmation and configure the orchestration layer to prompt the user for approval before forwarding any calls to annotated tools.",
        "Replace with two tools: preview_remove_member returns impact details and a single-use confirmation token; execute_remove_member requires that token, binding execution to the specific previewed action.",
        "Add server-side validation that permits dry_run=false only when a dry_run=true call with identical parameters occurred within the past 60 seconds."
      ],
      "answers": [
        "Replace with two tools: preview_remove_member returns impact details and a single-use confirmation token; execute_remove_member requires that token, binding execution to the specific previewed action."
      ],
      "explanation": {
        "key": "<b>“You need to ensure every removal is preceded by a preview”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Replace with two tools: preview_remove_member returns impact details and a single-use”</b> <i>(trong đáp án C)</i>: Thay thế bằng hai công cụ: Preview_remove_member trả về thông tin chi tiết về tác động và token…",
        "elimination": [
          "<b>A. Add detailed instructions and few-shot examples to the tool description requiring the agent to always call with dry_run=true first and wait for user confirmation before calling with dry_run=false.</b>: Prompt và ví dụ chỉ định hướng hành vi xác suất; chúng không thể bảo…",
          "<b>B. Annotate the tool as requiring confirmation and configure the orchestration layer to prompt the user for approval before forwarding any calls to annotated tools.</b>: Bỏ qua yêu cầu chính “You need to ensure every removal is preceded”.",
          "<b>D. Add server-side validation that permits dry_run=false only when a dry_run=true call with identical parameters occurred within the past 60 seconds.</b>: Bỏ qua yêu cầu chính “You need to ensure every removal is preceded”."
        ]
      }
    },
    {
      "number": 71,
      "topic": 1,
      "type": "mcq",
      "question": "Your invoice extraction uses tool use with strict JSON schemas. JSON syntax errors never occur, but 12% of extractions fail semantic validation--for example, line Item amounts don't extracted total, or vendor IDs don't match valid formats. These failures currently route to manual review. What's the most effective approach to reduce manual review volume while maintaining accuracy?",
      "options": [
        "Add stricter schema constraints with detailed field descriptions to prevent the model from generating invalid values initially.",
        "Retry the extraction up to 3 times when validation fallis, accepting the first result that passes validation.",
        "Implement post-processing logic that automatically corrects common amors, such as recalculating totais from line items when sums don't match.",
        "When validation falls, make a follow-up request with the document, extraction, and validation errors for model correction."
      ],
      "answers": [
        "When validation falls, make a follow-up request with the document, extraction, and validation errors for model correction."
      ],
      "explanation": {
        "key": "<b>“These failures currently route to manual review.”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“When validation falls, make a follow-up request with the document, extraction,”</b> <i>(trong đáp án D)</i>: Khi xác thực giảm, hãy đưa ra yêu cầu tiếp theo về các lỗi tài liệu, trích xuất…",
        "elimination": [
          "<b>A. Add stricter schema constraints with detailed field descriptions to prevent the model from generating invalid values initially.</b>: Bỏ qua yêu cầu chính “These failures currently route to manual review”.",
          "<b>B. Retry the extraction up to 3 times when validation fallis, accepting the first result that passes validation.</b>: Retry không thể tạo ra dữ liệu còn thiếu hoặc sửa lỗi validation, permission hay…",
          "<b>C. Implement post-processing logic that automatically corrects common amors, such as recalculating totais from line items when sums don't match.</b>: Bỏ qua yêu cầu chính “These failures currently route to manual review”."
        ]
      }
    },
    {
      "number": 72,
      "topic": 1,
      "type": "mcq",
      "question": "Your system must extract event details from calendar invitations and output JSON that strictly conforms to a schema with fields for title, date, time, location, and attendees. Downstream reject any malformed or non- conformant JSON. What approach provides the most reliable schema compliance?",
      "options": [
        "Include detailed JSON formatting instructions and the target schema in your prompt, then parse Claude's text response as JSON.",
        "Pre-fill Claude's response with an opening brace to force JSON output, then complete and parse the response.",
        "Define a tool with your target schema as input parameters and have Claude call it with the extracted data.",
        "Append instructions like \"Output only valid JSON matching the schema exactly\" and implement retry logic to re-prompt when JSON parsing fails."
      ],
      "answers": [
        "Define a tool with your target schema as input parameters and have Claude call it with the extracted data."
      ],
      "explanation": {
        "key": "<b>“Your system must extract event details from calendar invitations and output”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Define a tool with your target schema as input parameters and”</b> <i>(trong đáp án C)</i>: Xác định một công cụ có lược đồ mục tiêu của bạn làm tham số đầu vào và…",
        "elimination": [
          "<b>A. Include detailed JSON formatting instructions and the target schema in your prompt, then parse Claude's text response as JSON.</b>: Đầu ra text tự do buộc downstream hoặc model phải parse lại, làm tăng lỗi…",
          "<b>B. Pre-fill Claude's response with an opening brace to force JSON output, then complete and parse the response.</b>: Assistant prefill không còn được hỗ trợ trên các model Claude hiện hành và cũng…",
          "<b>D. Append instructions like \"Output only valid JSON matching the schema exactly\" and implement retry logic to re-prompt when JSON parsing fails.</b>: Retry không thể tạo ra dữ liệu còn thiếu hoặc sửa lỗi validation, permission hay…"
        ]
      }
    },
    {
      "number": 73,
      "topic": 1,
      "type": "mcq",
      "question": "Your extraction system uses tool_use with a JSON schema containing 12 fields and detailed descriptions, totaling approximately 2,500 tokens for the complete tool definition. Processing documents under 150K tokens yields 98% accuracy. For documents between 175-190K tokens, accuracy drops to 71%, with information from the final third consistently missed. The model's context window is 200K tokens. What is the most likely cause?",
      "options": [
        "Schemas exceeding 8-10 fields increase decision complexity during parameter generation, reducing extraction accuracy independent of document length.",
        "The model distributes attention proportionally across input length, causing fields mentioned only once near the document's end to receive insufficient processing focus.",
        "Very long documents exceed the model's effective attention span regardless of context limits, causing accuracy degradation for content farther from the prompt instructions.",
        "Tool definitions consume input context tokens. Combined with system prompts and document content, the total approaches the context limit, degrading end-of-document processing."
      ],
      "answers": [
        "Tool definitions consume input context tokens. Combined with system prompts and document content, the total approaches the context limit, degrading end-of-document processing."
      ],
      "explanation": {
        "key": "<b>“The model's context window is 200K tokens.”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Tool definitions consume input context tokens. Combined with system prompts and”</b> <i>(trong đáp án D)</i>: định nghĩa Công cụ sử dụng token ngữ cảnh đầu vào.",
        "elimination": [
          "<b>A. Schemas exceeding 8-10 fields increase decision complexity during parameter generation, reducing extraction accuracy independent of document length.</b>: Bỏ qua yêu cầu chính “The model's context window is 200K tokens”.",
          "<b>B. The model distributes attention proportionally across input length, causing fields mentioned only once near the document's end to receive insufficient processing focus.</b>: Tự sửa số liệu để làm chúng khớp nhau có thể che giấu OCR hoặc…",
          "<b>C. Very long documents exceed the model's effective attention span regardless of context limits, causing accuracy degradation for content farther from the prompt instructions.</b>: Bỏ qua yêu cầu chính “The model's context window is 200K tokens”."
        ]
      }
    },
    {
      "number": 74,
      "topic": 1,
      "type": "mcq",
      "question": "The extraction pipeline receives documents of varying types—some are invoices, others are contracts, and some are receipts. You've defined separate extraction tools, each with its own schema tailored to the document type. During testing, you observe that with tool_choice: \"auto\", Claude sometimes returns conversational text instead of calling an extraction tool, causing downstream parsing failures. You need guaranteed structured output without knowing the document type in advance. What's the most effective approach?",
      "options": [
        "Add a preliminary classification call, then make a second call with tool_choice forced to the identified extraction tool.",
        "Set tool_choice: \"any\" with all extraction tools defined.",
        "Consolidate all document types into a single unified-schema extraction tool and force that tool.",
        "Keep tool_choice: \"auto\" with system prompt instructions requiring tool use."
      ],
      "answers": [
        "Set tool_choice: \"any\" with all extraction tools defined."
      ],
      "explanation": {
        "key": "<b>“separate extraction tools, each with its own schema”</b> <i>(trong câu hỏi)</i>: Đã có tool riêng cho từng loại document — chỉ cần đảm bảo Claude buộc phải dùng một trong số đó.<br><b>“tool_choice: “any” with all extraction tools defined”</b> <i>(trong đáp án B)</i>: <code>any</code> bắt buộc Claude phải gọi một tool (guaranteed structured output) trong khi vẫn linh hoạt cho Claude chọn đúng schema theo loại tài liệu — không cần bước phân loại trước.",
        "elimination": [
          "<b>A. Add a preliminary classification call, then force tool_choice to the matching tool...</b>: Two-call approach gấp đôi chi phí API và latency — không cần thiết khi <code>any</code> đã đủ để Claude tự chọn đúng schema.",
          "<b>C. Consolidate all document types into a single unified-schema extraction tool...</b>: Một schema phải chứa tất cả fields của cả ba loại document — nhiều fields optional, kết quả kém chính xác hơn schema chuyên biệt.",
          "<b>D. Keep tool_choice: “auto” with system prompt instructions...</b>: <code>auto</code> cho phép Claude trả lời text thuần — không đảm bảo structured output, chỉ dùng prompt instructions không đủ tin cậy."
        ]
      }
    },
    {
      "number": 75,
      "topic": 1,
      "type": "mcq",
      "question": "Monitoring shows 12% of extractions fall Pydantic validation with specific errors like \"expected float for quantity, got '2 to 3\". Retrying these requests without modification produces failures. What's the most effective approach to recover from these validation failures?",
      "options": [
        "Set temperature to 0 to eliminate output variability and ensure consistent formatting",
        "Send a follow-up request including the validation error, asking the model to correct its output",
        "Implement a secondary pipeline using a larger model tier to reprocess documents that fail validation",
        "Pre-process source documents to standardize problematic formats before sending them for extraction"
      ],
      "answers": [
        "Send a follow-up request including the validation error, asking the model to correct its output"
      ],
      "explanation": {
        "key": "<b>“Retrying these requests without modification produces failures.”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Send a follow-up request including the validation error, asking the model”</b> <i>(trong đáp án B)</i>: Gửi yêu cầu tiếp theo bao gồm lỗi xác thực, yêu cầu mô hình sửa đầu ra của…",
        "elimination": [
          "<b>A. Set temperature to 0 to eliminate output variability and ensure consistent formatting</b>: Temperature chỉ điều chỉnh độ biến thiên khi sinh; nó không sửa schema, thiếu context…",
          "<b>C. Implement a secondary pipeline using a larger model tier to reprocess documents that fail validation</b>: Đổi model có thể cải thiện chất lượng chung nhưng không xử lý nguyên nhân…",
          "<b>D. Pre-process source documents to standardize problematic formats before sending them for extraction</b>: Bỏ qua yêu cầu chính “Retrying these requests without modification produces failures”."
        ]
      }
    },
    {
      "number": 76,
      "topic": 1,
      "type": "mcq",
      "question": "After three months of weekly sessions, your conversation history has grown to 85,000 tokens. When users ask \"What did we conclude about the theme of isolation?\", the assistant provides generic literary analysis rather than referencing the group's specific insights from earlier sessions. Discussions often build on previous meetings' conclusions, so maintaining narrative context is important. What's the most effective approach?",
      "options": [
        "Add structured XML tags to mark significant discussion conclusions throughout the conversation history.",
        "Implement rolling window truncation to keep only the most recent 25,000 tokens.",
        "Use semantic embedding to index the full conversation history and retrieve only relevant past exchanges for each user query, replacing the linear conversation format with retrieved segments.",
        "Implement progressive summarization where older conversation blocks are replaced with concise summaries that explicitly extract key conclusions, decisions, and recurring themes, keeping recent exchanges verbatim."
      ],
      "answers": [
        "Implement progressive summarization where older conversation blocks are replaced with concise summaries that explicitly extract key conclusions, decisions, and recurring themes, keeping recent exchanges verbatim."
      ],
      "explanation": {
        "key": "<b>“Discussions often build on previous meetings' conclusions, so maintaining narrative context”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Implement progressive summarization where older conversation blocks are replaced with concise”</b> <i>(trong đáp án D)</i>: Khi cuộc trò chuyện kéo dài nhưng vẫn phụ thuộc vào những kết luận trước đó, tóm tắt…",
        "elimination": [
          "<b>A. Add structured XML tags to mark significant discussion conclusions throughout the conversation history.</b>: Bỏ qua yêu cầu chính “Discussions often build on previous meetings' conclusions, so”.",
          "<b>B. Implement rolling window truncation to keep only the most recent 25,000 tokens.</b>: Bỏ qua yêu cầu chính “Discussions often build on previous meetings' conclusions, so”.",
          "<b>C. Use semantic embedding to index the full conversation history and retrieve only relevant past exchanges for each user query, replacing the linear conversation format with retrieved segments.</b>: Bỏ qua yêu cầu chính “Discussions often build on previous meetings' conclusions, so”."
        ]
      }
    },
    {
      "number": 77,
      "topic": 1,
      "type": "mcq",
      "question": "You're Implementing a feature where users refine their playlist preferences through multiple conversation turns. After deploying, you notice Claude's responses don't reflect what us earlier in the same conversation— for example, a user says they love jazz, but two messages later Claude asks what genres they enjoy. What is the most likely cause?",
      "options": [
        "Your application isn't including prior messages in the messages array",
        "The model's context window has been exceeded by the conversation length",
        "Claude requires a vector database connection to maintain conversation memory",
        "The Claude API requires a session_id parameter that you haven't configured"
      ],
      "answers": [
        "Your application isn't including prior messages in the messages array"
      ],
      "explanation": {
        "key": "<b>“After deploying, you notice Claude's responses don't reflect what us earlier”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Your application isn't including prior messages in the messages array”</b> <i>(trong đáp án A)</i>: Nếu Claude ngay lập tức quên những gì đã nói cách đây vài lượt trong cùng một cuộc…",
        "elimination": [
          "<b>B. The model's context window has been exceeded by the conversation length</b>: Bỏ qua yêu cầu chính “After deploying, you notice Claude's responses don't reflect”.",
          "<b>C. Claude requires a vector database connection to maintain conversation memory</b>: Retrieval có thể hữu ích ở quy mô lớn nhưng bổ sung hạ tầng và…",
          "<b>D. The Claude API requires a session_id parameter that you haven't configured</b>: Bỏ qua yêu cầu chính “After deploying, you notice Claude's responses don't reflect”."
        ]
      }
    },
    {
      "number": 78,
      "topic": 1,
      "type": "mcq",
      "question": "Your home renovation planning assistant uses a system prompt defining an expert contractor persona with specific guidelines: always ask about budget, suggest alternatives at multiple price points, and confirm timeline requirements. During testing, responses follow these guidelines for turns 1-4, but by turn 7, the assistant gives generic advice without asking about budget or timeline. The conversation is only 2,000 tokens—well within the context window. What is the most likely cause?",
      "options": [
        "The model's attention on system prompt instructions naturally weakens as turns accumulate.",
        "System prompts only establish initial behavior and don't persist across all turns.",
        "The system prompt is only sent with the first API request.",
        "The assistant's accumulated responses are diluting the system prompt's influence."
      ],
      "answers": [
        "The assistant's accumulated responses are diluting the system prompt's influence."
      ],
      "explanation": {
        "key": "<b>“only 2,000 tokens — well within the context window”</b> <i>(trong câu hỏi)</i>: Đề loại trừ context overflow; system prompt được gửi đầy đủ mọi request — nguyên nhân phải là tỷ lệ ảnh hưởng của system prompt so với toàn bộ conversation.<br><b>“accumulated responses are diluting the system prompt’s influence”</b> <i>(trong đáp án D)</i>: Khi conversation dài ra, assistant messages tích lũy chiếm phần lớn context — model bắt đầu follow patterns từ responses trước hơn là system prompt, dẫn đến persona drift.",
        "elimination": [
          "<b>A. ...attention on system prompt instructions naturally weakens as turns accumulate.</b>: Mô tả chung chung, không chỉ đích cơ chế — D giải thích đúng nguyên nhân cụ thể hơn (accumulated responses tạo ra pattern mạnh hơn).",
          "<b>B. System prompts only establish initial behavior and don’t persist across all turns.</b>: Không chính xác — system prompt được gửi lại với mọi API request. Vấn đề là tỷ lệ ảnh hưởng, không phải thiếu persistence.",
          "<b>C. The system prompt is only sent with the first API request.</b>: Sai về kỹ thuật — trong stateless API, toàn bộ conversation history kèm system prompt được gửi mọi request. Context đầy đủ nhưng ảnh hưởng bị loãng bởi volume assistant messages."
        ]
      }
    },
    {
      "number": 79,
      "topic": 1,
      "type": "mcq",
      "question": "Users report that during extended conversations, the AI loses track of specific topics, examples, and preferences they mentioned earlier in the session. Your current implementation uses a sliding window that keeps only the most recent 25 message pairs to stay within context limits. What's the most effective approach to maintain awareness of earlier conversation content while managing context size?",
      "options": [
        "Increase the window size to 50 message pairs to retain more conversation history before truncation.",
        "Add a separate API call each turn to summarize messages being dropped, prepending this running summary to the conversation.",
        "Implement vector similarity search over the full conversation history, retrieving relevant past messages for each user query.",
        "Replace the sliding window with a hybrid approach: summarize older messages while keeping recent messages verbatim."
      ],
      "answers": [
        "Replace the sliding window with a hybrid approach: summarize older messages while keeping recent messages verbatim."
      ],
      "explanation": {
        "key": "<b>“Your current implementation uses a sliding window that keeps only the”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Replace the sliding window with a hybrid approach: summarize older messages”</b> <i>(trong đáp án D)</i>: Thay thế cửa sổ trượt bằng phương pháp kết hợp: tóm tắt các tin nhắn cũ hơn trong…",
        "elimination": [
          "<b>A. Increase the window size to 50 message pairs to retain more conversation history before truncation.</b>: Bỏ qua yêu cầu chính “Your current implementation uses a sliding window that”.",
          "<b>B. Add a separate API call each turn to summarize messages being dropped, prepending this running summary to the conversation.</b>: Bỏ qua yêu cầu chính “Your current implementation uses a sliding window that”.",
          "<b>C. Implement vector similarity search over the full conversation history, retrieving relevant past messages for each user query.</b>: Retrieval có thể hữu ích ở quy mô lớn nhưng bổ sung hạ tầng và…"
        ]
      }
    },
    {
      "number": 80,
      "topic": 1,
      "type": "mcq",
      "question": "During QA testing, you notice that Claude follows your system prompt guidelines consistently in the first 10- 15 turns, but by turn 25-30, responses begin deviating—using informal tone when formality was specified, occasionally skipping required formatting, or providing information types the guidelines restrict. Conversation length is well within context limits (typically 30,000 tokens out of 200,000 available). What's the most effective approach to maintain consistent behavior throughout extended conversations?",
      "options": [
        "Automatically start a new conversation after 20 turns, passing a summary of the prior context to maintain continuity.",
        "Insert user-role messages that reinforce critical guidelines at natural conversation breakpoints, especially before complex requests.",
        "Move behavioral guidelines from the system prompt into the first user message.",
        "Implement post-response validation that regenerates each response until it conforms to the specified guidelines."
      ],
      "answers": [
        "Insert user-role messages that reinforce critical guidelines at natural conversation breakpoints, especially before complex requests."
      ],
      "explanation": {
        "key": "<b>“Conversation length is well within context limits (typically 30,000 tokens out”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Insert user-role messages that reinforce critical guidelines at natural conversation breakpoints,”</b> <i>(trong đáp án B)</i>: Chèn thông báo vai trò của người dùng nhằm củng cố các nguyên tắc quan trọng tại các…",
        "elimination": [
          "<b>A. Automatically start a new conversation after 20 turns, passing a summary of the prior context to maintain continuity.</b>: Bỏ qua yêu cầu chính “Conversation length is well within context limits (typically”.",
          "<b>C. Move behavioral guidelines from the system prompt into the first user message.</b>: Bỏ qua yêu cầu chính “Conversation length is well within context limits (typically”.",
          "<b>D. Implement post-response validation that regenerates each response until it conforms to the specified guidelines.</b>: Bỏ qua yêu cầu chính “Conversation length is well within context limits (typically”."
        ]
      }
    },
    {
      "number": 81,
      "topic": 1,
      "type": "mcq",
      "question": "During a conversation about order tracking, your external system receives a webhook indicating the user's package has shipped. The user is actively chatting and will likely send a follow-up message soon. You want the assistant to naturally incorporate this status change in its next response. What's the most effective approach?",
      "options": [
        "Immediately send an API request with the update as a synthetic user message, generating an unsolicited assistant response.",
        "Append the status update as a prefix to the next user message before calling the API.",
        "Configure the assistant to call a get_order_status tool at the start of every response.",
        "Add the current shipping status to the system prompt before the next API call."
      ],
      "answers": [
        "Add the current shipping status to the system prompt before the next API call."
      ],
      "explanation": {
        "key": "<b>“You want the assistant to naturally incorporate this status change in”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Add the current shipping status to the system prompt before the”</b> <i>(trong đáp án D)</i>: Thêm trạng thái vận chuyển hiện tại vào lời nhắc hệ thống trước lệnh gọi API tiếp theo.",
        "elimination": [
          "<b>A. Immediately send an API request with the update as a synthetic user message, generating an unsolicited assistant response.</b>: Bỏ qua yêu cầu chính “You want the assistant to naturally incorporate this”.",
          "<b>B. Append the status update as a prefix to the next user message before calling the API.</b>: Bỏ qua yêu cầu chính “You want the assistant to naturally incorporate this”.",
          "<b>C. Configure the assistant to call a get_order_status tool at the start of every response.</b>: Bỏ qua yêu cầu chính “You want the assistant to naturally incorporate this”."
        ]
      }
    },
    {
      "number": 82,
      "topic": 1,
      "type": "mcq",
      "question": "Users report that responses feel repetitive across turns—each message begins with phrases like \"Certainly!\" or \"I'd be happy to help!\" even deep into conversations. You want responses to feel more natural, without these repetitive openers. What's the most effective approach?",
      "options": [
        "Add system prompt instructions specifying phrases to avoid, such as \"Never begin responses with 'Certainly' or similar affirmations\"",
        "Implement post-processing to detect and strip common greeting phrases from response beginnings",
        "Append a partial assistant message with a direct response opening that the model will continue from",
        "Lower the temperature parameter to make response openings more deterministic and less variable"
      ],
      "answers": [
        "Append a partial assistant message with a direct response opening that the model will continue from"
      ],
      "explanation": {
        "key": "<b>“repetitive across turns”</b> <i>(trong câu hỏi)</i>: Lỗi xảy ra ở opening của mỗi response — cần kiểm soát trực tiếp điểm bắt đầu của response thay vì chỉ dùng instructions.<br><b>“append a partial assistant message with a direct response opening”</b> <i>(trong đáp án C)</i>: Prefill bắt buộc model tiếp tục từ opening đã cho — đây là cách kiểm soát response format chắc chắn nhất vì model không thể override token đã có sẵn.",
        "elimination": [
          "<b>A. Add system prompt instructions specifying phrases to avoid...</b>: Instruction phủ định (“never begin with...”) kém hiệu quả hơn prefill — model vẫn có thể tìm ra các opening tương tự không bị liệt kê tường minh.",
          "<b>B. Implement post-processing to detect and strip greeting phrases...</b>: Cắt chuỗi sau khi sinh có thể tạo câu mở đầu cụt hoặc sai ngữ pháp; không giải quyết gốc rễ vấn đề, chỉ xử lý triệu chứng.",
          "<b>D. Lower the temperature parameter...</b>: Temperature thấp làm output deterministic hơn nhưng không loại bỏ được opening phrases — thậm chí có thể làm chúng xuất hiện nhất quán hơn."
        ]
      }
    },
    {
      "number": 83,
      "topic": 1,
      "type": "mcq",
      "question": "Users frequently send ambiguous requests like \"book a venue for the party\" without specifying date, guest count, or budget. Your evaluation shows the assistant asks an average of 4.2 clarifying questions before taking any action, causing 35% of users to abandon mid-conversation. However, when you reduce questions, users sometimes receive recommendations that don't match their preferences. What's the most effective approach to improve this trade-off?",
      "options": [
        "Instruct the assistant to state explicit assumptions based on conversation history, proceed with recommendations while inviting corrections, and reserve clarifying questions only for irreversible actions like confirming bookings.",
        "Configure the assistant to consolidate all clarifying questions into a single compound question (e.g., \"What date, guest count, and budget are you considering?\") to reduce the total number of conversational turns.",
        "Implement a structured intake form that collects all required parameters (date, guest count, budget, venue type) upfront before the assistant begins providing any recommendations.",
        "Configure the assistant to proceed with reasonable defaults (medium-sized venue, next weekend, moderate budget) without explicitly stating these assumptions, allowing users to provide corrections if results don't match expectations."
      ],
      "answers": [
        "Instruct the assistant to state explicit assumptions based on conversation history, proceed with recommendations while inviting corrections, and reserve clarifying questions only for irreversible actions like confirming bookings."
      ],
      "explanation": {
        "key": "<b>“Your evaluation shows the assistant asks an average of 4.2 clarifying”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Instruct the assistant to state explicit assumptions based on conversation history,”</b> <i>(trong đáp án A)</i>: Hướng dẫn trợ lý nêu các giả định rõ ràng dựa trên lịch sử cuộc trò chuyện, tiếp…",
        "elimination": [
          "<b>B. Configure the assistant to consolidate all clarifying questions into a single compound question (e.g., \"What date, guest count, and budget are you considering?\") to reduce the total number of conversational turns.</b>: Bỏ qua yêu cầu chính “Your evaluation shows the assistant asks an average”.",
          "<b>C. Implement a structured intake form that collects all required parameters (date, guest count, budget, venue type) upfront before the assistant begins providing any recommendations.</b>: Bỏ qua yêu cầu chính “Your evaluation shows the assistant asks an average”.",
          "<b>D. Configure the assistant to proceed with reasonable defaults (medium-sized venue, next weekend, moderate budget) without explicitly stating these assumptions, allowing users to provide corrections if results don't match expectations.</b>: Bỏ qua yêu cầu chính “Your evaluation shows the assistant asks an average”."
        ]
      }
    },
    {
      "number": 84,
      "topic": 1,
      "type": "mcq",
      "question": "Your conversational AI tutor has a 2,800-token system prompt containing teaching methodology, persona guidelines, and detailed written instructions for adapting explanations to different proficiency levels. User testing reveals that in conversations exceeding 12 turns (approximately 4,000 tokens of conversation history), the assistant increasingly ignores the proficiency-adaptation guidelines, defaulting to intermediate-level explanations regardless of the learner's stated level. What's the most effective approach to ensure consistent adherence to these guidelines throughout extended conversations?",
      "options": [
        "Inject a condensed reminder of the proficiency requirements into the conversation as a system message every 4-5 turns.",
        "Replace the verbose proficiency guidelines with few-shot examples demonstrating appropriate responses at each proficiency level, showing concrete differences in vocabulary, complexity, and explanation depth.",
        "After each assistant response, make a separate API call to evaluate whether the difficulty level matched the learner's profile, regenerating responses that don't align.",
        "Restructure the system prompt to place the proficiency-adaptation rules in a clearly-marked final section immediately before the conversation history begins."
      ],
      "answers": [
        "Replace the verbose proficiency guidelines with few-shot examples demonstrating appropriate responses at each proficiency level, showing concrete differences in vocabulary, complexity, and explanation depth."
      ],
      "explanation": {
        "key": "<b>“User testing reveals that in conversations exceeding 12 turns (approximately 4,000”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Replace the verbose proficiency guidelines with few-shot examples demonstrating appropriate responses”</b> <i>(trong đáp án B)</i>: Thay thế các hướng dẫn chi tiết về trình độ thành thạo bằng một vài ví dụ ngắn…",
        "elimination": [
          "<b>A. Inject a condensed reminder of the proficiency requirements into the conversation as a system message every 4-5 turns.</b>: Bash có thể thực hiện thao tác nhưng dễ vỡ và bỏ qua contract hoặc…",
          "<b>C. After each assistant response, make a separate API call to evaluate whether the difficulty level matched the learner's profile, regenerating responses that don't align.</b>: Bỏ qua yêu cầu chính “User testing reveals that in conversations exceeding 12”.",
          "<b>D. Restructure the system prompt to place the proficiency-adaptation rules in a clearly-marked final section immediately before the conversation history begins.</b>: Bỏ qua yêu cầu chính “User testing reveals that in conversations exceeding 12”."
        ]
      }
    },
    {
      "number": 85,
      "topic": 1,
      "type": "mcq",
      "question": "The system routes documents with extraction confidence below 85% to human review. A quarterly audit reveals that 12% of high-confidence extractions (>85%) also contain errors—cases where the model finds plausible-but-incorrect values. Error sources vary: comparison tables showing competitor specs, appendices referencing different product variants, and ambiguous phrasing the model misinterprets. You need a sustainable strategy to catch these high-confidence errors and measure whether improvements reduce the error rate over time. What approach is most effective?",
      "options": [
        "Add a verification pass that re-extracts from each high-confidence document, flagging cases where the two extraction attempts produce different results.",
        "Lower the confidence threshold from 85% to 70%, routing a larger volume of extractions to human review.",
        "Implement heuristic rules that flag documents containing comparison tables or appendices for review regardless of confidence score.",
        "Implement stratified random sampling reviewing a fixed percentage of high-confidence extractions weekly, enabling error rate measurement and novel pattern detection."
      ],
      "answers": [
        "Implement stratified random sampling reviewing a fixed percentage of high-confidence extractions weekly, enabling error rate measurement and novel pattern detection."
      ],
      "explanation": {
        "key": "<b>“You need a sustainable strategy to catch these high-confidence errors and”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Implement stratified random sampling reviewing a fixed percentage of high-confidence extractions”</b> <i>(trong đáp án D)</i>: Triển khai lấy mẫu ngẫu nhiên phân tầng, xem xét tỷ lệ phần trăm cố định của các…",
        "elimination": [
          "<b>A. Add a verification pass that re-extracts from each high-confidence document, flagging cases where the two extraction attempts produce different results.</b>: Bỏ qua yêu cầu chính “You need a sustainable strategy to catch these”.",
          "<b>B. Lower the confidence threshold from 85% to 70%, routing a larger volume of extractions to human review.</b>: Bỏ qua yêu cầu chính “You need a sustainable strategy to catch these”.",
          "<b>C. Implement heuristic rules that flag documents containing comparison tables or appendices for review regardless of confidence score.</b>: Bỏ qua yêu cầu chính “You need a sustainable strategy to catch these”."
        ]
      }
    },
    {
      "number": 86,
      "topic": 1,
      "type": "mcq",
      "question": "Your research assistant helps users analyze academic papers over extended conversations. User testing reveals a recurring issue: after conversations exceed 60K tokens, users ask follow-up questions requiring precise numerical details from papers discussed earlier—sample sizes, exact p-values, specific inclusion criteria. Your current approach summarizes paper discussions after 8 turns to stay within context limits. Users report that responses to these precision-dependent questions are often hedged or inaccurate. What's the most effective architectural change?",
      "options": [
        "Keep source text from methodology and results sections in context permanently, while summarizing only the conversational discussion and interpretation portions.",
        "Use a separate Claude call with explicit instructions to generate higher-fidelity summaries that preserve all numerical details and statistical values.",
        "Implement retrieval that re-injects relevant paper sections when the user's question suggests they need specific numerical details.",
        "Maintain a structured database of key facts extracted from each paper (sample sizes, statistics, methods) and retrieve relevant entries into context when precision-dependent questions are detected."
      ],
      "answers": [
        "Maintain a structured database of key facts extracted from each paper (sample sizes, statistics, methods) and retrieve relevant entries into context when precision-dependent questions are detected."
      ],
      "explanation": {
        "key": "<b>“Your current approach summarizes paper discussions after 8 turns to stay”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Maintain a structured database of key facts extracted from each paper”</b> <i>(trong đáp án D)</i>: Duy trì cơ sở dữ liệu có cấu trúc về các sự kiện chính được trích xuất từ…",
        "elimination": [
          "<b>A. Keep source text from methodology and results sections in context permanently, while summarizing only the conversational discussion and interpretation portions.</b>: Bỏ qua yêu cầu chính “Your current approach summarizes paper discussions after 8”.",
          "<b>B. Use a separate Claude call with explicit instructions to generate higher-fidelity summaries that preserve all numerical details and statistical values.</b>: Bỏ qua yêu cầu chính “Your current approach summarizes paper discussions after 8”.",
          "<b>C. Implement retrieval that re-injects relevant paper sections when the user's question suggests they need specific numerical details.</b>: Bỏ qua yêu cầu chính “Your current approach summarizes paper discussions after 8”."
        ]
      }
    },
    {
      "number": 87,
      "topic": 1,
      "type": "mcq",
      "question": "A security audit requires updating your authentication library from v2 to v3. The migration guide documents breaking changes: authenticate() now returns a Promise instead of accepting a callback, the User type has restructured fields, and three deprecated methods were removed. Grep shows the library is imported in 45 files across several modules. What's the most effective approach?",
      "options": [
        "Create a custom slash command encapsulating the migration transformations, then execute it against each file without prior codebase exploration.",
        "Update the dependency version, run the test suite, and use Claude Code to fix each failure as it appears.",
        "Enter plan mode to explore library usage across modules, map affected code paths, then create a migration strategy before implementing.",
        "Paste the migration guide's breaking changes into your prompt and use direct execution to update all usages across the 45 files."
      ],
      "answers": [
        "Enter plan mode to explore library usage across modules, map affected code paths, then create a migration strategy before implementing."
      ],
      "explanation": {
        "key": "<b>“Grep shows the library is imported in 45 files across several”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Enter plan mode to explore library usage across modules, map affected”</b> <i>(trong đáp án C)</i>: Vào chế độ kế hoạch để khám phá việc sử dụng thư viện trên các mô-đun, ánh xạ…",
        "elimination": [
          "<b>A. Create a custom slash command encapsulating the migration transformations, then execute it against each file without prior codebase exploration.</b>: Bỏ qua yêu cầu chính “Grep shows the library is imported in 45”.",
          "<b>B. Update the dependency version, run the test suite, and use Claude Code to fix each failure as it appears.</b>: Bỏ qua yêu cầu chính “Grep shows the library is imported in 45”.",
          "<b>D. Paste the migration guide's breaking changes into your prompt and use direct execution to update all usages across the 45 files.</b>: Bỏ qua yêu cầu chính “Grep shows the library is imported in 45”."
        ]
      }
    },
    {
      "number": 88,
      "topic": 1,
      "type": "mcq",
      "question": "You've asked Claude Code to build a PDF report generation feature. The initial implementation queries the database correctly, but the output has formatting issues: table columns are too narrow causing content truncation, dates display without proper formatting, and page break handling is incorrect. You've noticed these issues interact— changing column widths affects how dates render, and page breaks depend on content height. What's the most effective approach for iterating toward a working solution?",
      "options": [
        "Address the column width issue first with specific measurements, verify it works, then fix date formatting within the corrected columns, then adjust page breaks— testing after each change.",
        "Show Claude an example of a correctly formatted report and ask it to match that output, rather than listing the specific technical issues.",
        "Start fresh with a detailed prompt specifying all formatting requirements upfront.",
        "Provide all three issues in a single detailed message with exact specifications for each, allowing Claude to address them together in one update."
      ],
      "answers": [
        "Address the column width issue first with specific measurements, verify it works, then fix date formatting within the corrected columns, then adjust page breaks— testing after each change."
      ],
      "explanation": {
        "key": "<b>“You've noticed these issues interact— changing column widths affects how dates”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Address the column width issue first with specific measurements, verify it”</b> <i>(trong đáp án A)</i>: Giải quyết vấn đề về độ rộng cột trước tiên bằng các phép đo cụ thể, xác minh…",
        "elimination": [
          "<b>B. Show Claude an example of a correctly formatted report and ask it to match that output, rather than listing the specific technical issues.</b>: Bỏ qua yêu cầu chính “You've noticed these issues interact— changing column widths”.",
          "<b>C. Start fresh with a detailed prompt specifying all formatting requirements upfront.</b>: Bắt đầu lại làm mất phần context đã tích lũy và buộc hệ thống lặp…",
          "<b>D. Provide all three issues in a single detailed message with exact specifications for each, allowing Claude to address them together in one update.</b>: Bỏ qua yêu cầu chính “You've noticed these issues interact— changing column widths”."
        ]
      }
    },
    {
      "number": 89,
      "topic": 1,
      "type": "mcq",
      "question": "You're implementing a new payment processing module that must follow your project's established patterns for database transactions, error handling, and audit logging. You've identified three existing modules that exemplify these patterns: db_utils.py, error_handlers.py, and audit_logger.py. This is a one-off integration task—these patterns are well-documented in your team wiki and don't need additional project-level documentation. What's the most effective approach?",
      "options": [
        "Ask Claude to explore your codebase to find and understand the transaction, error handling, and logging patterns before generating the new module.",
        "Use @references to include the three modules directly in your prompt, giving Claude concrete code examples of the patterns to follow.",
        "Add documentation of each pattern to your CLAUDE.md file, establishing them as project conventions that Claude will apply automatically.",
        "Describe the patterns from the three modules in natural language in your prompt, explaining the transaction handling approach, error format, and logging conventions Claude should follow."
      ],
      "answers": [
        "Use @references to include the three modules directly in your prompt, giving Claude concrete code examples of the patterns to follow."
      ],
      "explanation": {
        "key": "<b>“This is a one-off integration task—these patterns are well-documented in your”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Use @references to include the three modules directly in your prompt,”</b> <i>(trong đáp án B)</i>: Sử dụng @references để đưa trực tiếp ba mô-đun vào lời nhắc của bạn, đưa ra các ví…",
        "elimination": [
          "<b>A. Ask Claude to explore your codebase to find and understand the transaction, error handling, and logging patterns before generating the new module.</b>: Bỏ qua yêu cầu chính “This is a one-off integration task—these patterns are”.",
          "<b>C. Add documentation of each pattern to your CLAUDE.md file, establishing them as project conventions that Claude will apply automatically.</b>: Bỏ qua yêu cầu chính “This is a one-off integration task—these patterns are”.",
          "<b>D. Describe the patterns from the three modules in natural language in your prompt, explaining the transaction handling approach, error format, and logging conventions Claude should follow.</b>: Bỏ qua yêu cầu chính “This is a one-off integration task—these patterns are”."
        ]
      }
    },
    {
      "number": 90,
      "topic": 1,
      "type": "mcq",
      "question": "Your monorepo contains shared coding standards in /docs/standards/security-rules.md (for services handling user data), testing-patterns.md (for all packages), and api-conventions.md (for API-facing services). Your 15 packages are organized by feature domain (/packages/auth/, /packages/billing/, /packages/notifications/, etc.) without naming conventions indicating which handle user data or expose APIs. Package maintainers are expected to configure their own local development settings, as they understand their package's domain requirements. Currently, all package CLAUDE.md files duplicate all three standards, applying irrelevant guidance. What's the most effective approach?",
      "options": [
        "Use @imports in each package's CLAUDE.md to reference only the specific standard files relevant to that package, based on the maintainer's domain knowledge.",
        "Create claude/rules/ files for each standard with YAML frontmatter paths listing every package directory where that standard should apply.",
        "Create a shared-standards.nd that uses @imports to combine all three standards, then have each package's CLAUDE.md import that combined file.",
        "Put all standards in the root CLAUDE.md with override instructions like \"ignore security-rules.md when working in packages that don't handle user data.\""
      ],
      "answers": [
        "Use @imports in each package's CLAUDE.md to reference only the specific standard files relevant to that package, based on the maintainer's domain knowledge."
      ],
      "explanation": {
        "key": "<b>“Currently, all package CLAUDE.md files duplicate all three standards, applying irrelevant”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Use @imports in each package's CLAUDE.md to reference only the specific”</b> <i>(trong đáp án A)</i>: Sử dụng @imports trong CLAUDE.md của mỗi gói để chỉ tham chiếu các tệp tiêu chuẩn cụ thể…",
        "elimination": [
          "<b>B. Create claude/rules/ files for each standard with YAML frontmatter paths listing every package directory where that standard should apply.</b>: Bỏ qua yêu cầu chính “Currently, all package CLAUDE.md files duplicate all three”.",
          "<b>C. Create a shared-standards.nd that uses @imports to combine all three standards, then have each package's CLAUDE.md import that combined file.</b>: Bỏ qua yêu cầu chính “Currently, all package CLAUDE.md files duplicate all three”.",
          "<b>D. Put all standards in the root CLAUDE.md with override instructions like \"ignore security-rules.md when working in packages that don't handle user data.\"</b>: Bỏ qua yêu cầu chính “Currently, all package CLAUDE.md files duplicate all three”."
        ]
      }
    },
    {
      "number": 91,
      "topic": 1,
      "type": "mcq",
      "question": "The system needs to extract candidate information (name, contact details, skills, work experience, education) from uploaded resumes. The extracted data must strictly conform to a predefined JSON schema, as missing required fields or incorrect data types will cause downstream validation failures. What is the most reliable approach to ensure Claude's output consistently matches the schema?",
      "options": [
        "Define a tool with an input schema matching your required JSON structure and extract the data from Claude's tool_use response.",
        "Make two separate API calls—first extracting information as text, then asking Claude to format that text as JSON.",
        "Include detailed JSON formatting instructions and a template example in the system prompt, asking Claude to output only valid JSON.",
        "Parse Claude's text response with regex patterns to extract JSON objects, using retry logic for malformed responses."
      ],
      "answers": [
        "Define a tool with an input schema matching your required JSON structure and extract the data from Claude's tool_use response."
      ],
      "explanation": {
        "key": "<b>“The extracted data must strictly conform to a predefined JSON schema,”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Define a tool with an input schema matching your required JSON”</b> <i>(trong đáp án A)</i>: Xác định một công cụ có lược đồ đầu vào khớp với cấu trúc JSON được yêu cầu…",
        "elimination": [
          "<b>B. Make two separate API calls—first extracting information as text, then asking Claude to format that text as JSON.</b>: Bỏ qua yêu cầu chính “The extracted data must strictly conform to a”.",
          "<b>C. Include detailed JSON formatting instructions and a template example in the system prompt, asking Claude to output only valid JSON.</b>: Bỏ qua yêu cầu chính “The extracted data must strictly conform to a”.",
          "<b>D. Parse Claude's text response with regex patterns to extract JSON objects, using retry logic for malformed responses.</b>: Retry không thể tạo ra dữ liệu còn thiếu hoặc sửa lỗi validation, permission hay…"
        ]
      }
    },
    {
      "number": 92,
      "topic": 1,
      "type": "mcq",
      "question": "Anthropic's tool use documentation states: \"Write instructive error messages. Instead of generic errors like 'failed', include what went wrong and what Claude should try next.\" A billing dispute agent uses lookup_order, which catches all exceptions and returns a tool_result with is_error: true and the message \"execution failed\". Monitoring shows two failure modes: the agent retries the identical call until hitting the turn limit, or it immediately calls escalate_to_human without trying alternative tools. Which change follows the documented recommendation and gives Claude the information it needs to select the correct recovery action for each error type?",
      "options": [
        "Return error-type-specific messages with is_error: true, e.g., \"order not found-try get_customer to search by phone\" for data errors and \"Database timeout (transient)-retry should succeed\" for infrastructure errors.",
        "Implement retry logic with exponential backoff inside each tool implementation so transient errors are resolved transparently within the tool before any failure result is surfaced to Claude in the agentic loop.",
        "Remove is_error: true and return the error details as normal tool content, so Claude reasons about the response as data rather than treating it as a flagged failure condition that biases retry behavior.",
        "Add an error classification step in the agentic loop that intercepts tool errors before Claude sees them, tags each as \"retry\" \"try_alternative,\" or \"escalate,\" and adds that recommendation to the tool result."
      ],
      "answers": [
        "Return error-type-specific messages with is_error: true, e.g., \"order not found-try get_customer to search by phone\" for data errors and \"Database timeout (transient)-retry should succeed\" for infrastructure errors."
      ],
      "explanation": {
        "key": "<b>“Monitoring shows two failure modes: the agent retries the identical call”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Return error-type-specific messages with is_error: true, e.g., \"order not found-try get_customer”</b> <i>(trong đáp án A)</i>: Trả về các thông báo dành riêng cho loại lỗi với is_error: true, ví dụ: \"không tìm thấy…",
        "elimination": [
          "<b>B. Implement retry logic with exponential backoff inside each tool implementation so transient errors are resolved transparently within the tool before any failure result is surfaced to Claude in the agentic loop.</b>: Retry có thể che bớt lỗi tạm thời nhưng không cung cấp cho agent loại…",
          "<b>C. Remove is_error: true and return the error details as normal tool content, so Claude reasons about the response as data rather than treating it as a flagged failure condition that biases retry behavior.</b>: Retry có thể che bớt lỗi tạm thời nhưng không cung cấp cho agent loại…",
          "<b>D. Add an error classification step in the agentic loop that intercepts tool errors before Claude sees them, tags each as \"retry\" \"try_alternative,\" or \"escalate,\" and adds that recommendation to the tool result.</b>: Retry có thể che bớt lỗi tạm thời nhưng không cung cấp cho agent loại…"
        ]
      }
    },
    {
      "number": 93,
      "topic": 1,
      "type": "mcq",
      "question": "Production logs reveal inconsistent error handling: when tool_code fails, the agent sometimes retries 5 times (even if the tool_id doesn't exist), sometimes escalates immediately (premature for temporary network issues), and sometimes adds user-friendly explanation (inappropriate when the issue is a backend permission error). Investigation shows four MCP tool returns uniform error responses: {\"status\": \"error\", \"content\": \"{\"type\": \"Error\", \"message\": \"Operation failed.\"}\"}. The agent learns different types. What's the most effective improvement?",
      "options": [
        "Add a few-shot examples to the system prompt demonstrating how to interpret error message patterns and select appropriate responses for each.",
        "Enhance error responses with structured metadata. Include error_category (transient/retriable/permission), reason, and a description of what caused the failure.",
        "Implement retry logic with exponential backoff in your MCP server for all errors, returning to the agent only after retries are exhausted.",
        "Create an analyze_error MCP tool the agent calls after any failure to determine the error category and recommended action."
      ],
      "answers": [
        "Enhance error responses with structured metadata. Include error_category (transient/retriable/permission), reason, and a description of what caused the failure."
      ],
      "explanation": {
        "key": "<b>“Investigation shows four MCP tool returns uniform error responses: {\"status\": \"error\",”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Enhance error responses with structured metadata. Include error_category (transient/retriable/permission), reason, and”</b> <i>(trong đáp án B)</i>: Tăng cường phản hồi lỗi bằng siêu dữ liệu có cấu trúc.",
        "elimination": [
          "<b>A. Add a few-shot examples to the system prompt demonstrating how to interpret error message patterns and select appropriate responses for each.</b>: Bổ sung hướng dẫn chung có thể cải thiện phần nào nhưng không làm rõ…",
          "<b>C. Implement retry logic with exponential backoff in your MCP server for all errors, returning to the agent only after retries are exhausted.</b>: Retry không thể tạo ra dữ liệu còn thiếu hoặc sửa lỗi validation, permission hay…",
          "<b>D. Create an analyze_error MCP tool the agent calls after any failure to determine the error category and recommended action.</b>: Bỏ qua yêu cầu chính “Investigation shows four MCP tool returns uniform error”."
        ]
      }
    },
    {
      "number": 94,
      "topic": 1,
      "type": "mcq",
      "question": "Your code review prompts include both implementation changes and the corresponding test file, but the LLM's review comments fail to point out untested code paths. Analysis reveals the model correctly flags functions that have no tests at all, but fails to identify when conditional branches or error-handling paths within tested functions that have no tests at all, but fails to identify when conditional branches or error-handling paths within tested functio lack coverage. What's the most effective way to improve detection of branch-level coverage gaps without overcomplicating the pipeline?",
      "options": [
        "Implement a multi-pass pipeline where separate LLM calls first extract all conditional branches, then cross-reference each against test assertions in a second pass.",
        "Add explicit instructions directing the model to enumerate each conditional branch and exception path, then verify each has a corresponding test assertion.",
        "Restructure the prompt to interleave implementation and tests, presenting each function followed immediately by its test cases",
        "Include few-shot examples showing code with an uncovered branch paired with the review comment identifying the specific missing test case."
      ],
      "answers": [
        "Include few-shot examples showing code with an uncovered branch paired with the review comment identifying the specific missing test case."
      ],
      "explanation": {
        "key": "<b>“Analysis reveals the model correctly flags functions that have no tests”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Include few-shot examples showing code with an uncovered branch paired with”</b> <i>(trong đáp án D)</i>: Bao gồm một vài ví dụ hiển thị mã có nhánh chưa được phát hiện được ghép nối…",
        "elimination": [
          "<b>A. Implement a multi-pass pipeline where separate LLM calls first extract all conditional branches, then cross-reference each against test assertions in a second pass.</b>: Bỏ qua yêu cầu chính “Analysis reveals the model correctly flags functions that”.",
          "<b>B. Add explicit instructions directing the model to enumerate each conditional branch and exception path, then verify each has a corresponding test assertion.</b>: Bỏ qua yêu cầu chính “Analysis reveals the model correctly flags functions that”.",
          "<b>C. Restructure the prompt to interleave implementation and tests, presenting each function followed immediately by its test cases</b>: Bỏ qua yêu cầu chính “Analysis reveals the model correctly flags functions that”."
        ]
      }
    },
    {
      "number": 95,
      "topic": 1,
      "type": "mcq",
      "question": "Your pipeline uses a tool called extract_metadata with a JSON schema for paper details. You've also defined lookup_citations and verify_doi tools for enrichment. During testing, you notice that when users include requests like \"extract the metadata and tell me how cited it is,\" Claude sometimes calls lookup_citations first, which fails because it needs the DOI that extract_metadata would provide. What's the most effective way to ensure structured metadata extraction happens first?",
      "options": [
        "Set tool_choice to {\"type\": \"tool\", \"name\": \"extract_metadata\"} and process the enrichment requests in subsequent turns after receiving the extracted metadata.",
        "Set tool_choice to \"any\" so Claude must use a tool, combined with system prompt instructions prioritizing extract_metadata.",
        "Set tool_choice to \"auto\" and reorder the tool definitions so extract_metadata appears first in the tools array, since Claude prioritizes earlier-listed tools.",
        "Set tool_choice to {\"type\": \"tool\", \"name\": \"extract_metadata\"} for every API call in the pipeline, ensuring Claude always extracts metadata before any enrichment can occur."
      ],
      "answers": [
        "Set tool_choice to {\"type\": \"tool\", \"name\": \"extract_metadata\"} and process the enrichment requests in subsequent turns after receiving the extracted metadata."
      ],
      "explanation": {
        "key": "<b>“During testing, you notice that when users include requests like \"extract”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Set tool_choice to {\"type\": \"tool\", \"name\": \"extract_metadata\"} and process the enrichment”</b> <i>(trong đáp án A)</i>: Ép <code>tool_choice</code> vào <code>extract_metadata</code> ở lượt đầu bảo đảm DOI được trích xuất trước.",
        "elimination": [
          "<b>B. Set tool_choice to \"any\" so Claude must use a tool, combined with system prompt instructions prioritizing extract_metadata.</b>: tool_choice: \"any\" chỉ ép dùng một tool bất kỳ, không bảo đảm đúng tool hoặc…",
          "<b>C. Set tool_choice to \"auto\" and reorder the tool definitions so extract_metadata appears first in the tools array, since Claude prioritizes earlier-listed tools.</b>: tool_choice: \"auto\" vẫn cho phép Claude trả lời bằng text hoặc chọn tool khác; nó…",
          "<b>D. Set tool_choice to {\"type\": \"tool\", \"name\": \"extract_metadata\"} for every API call in the pipeline, ensuring Claude always extracts metadata before any enrichment can occur.</b>: tool_choice: \"any\" chỉ ép dùng một tool bất kỳ, không bảo đảm đúng tool hoặc…"
        ]
      }
    },
    {
      "number": 96,
      "topic": 1,
      "type": "mcq",
      "question": "Your pipeline reviews every PR using a single API call with a static prompt containing the diff and full text of each changed file — unchanged files are not included. Reviews are posted asynchronously and don't block PR creation. Developers report that reviews consistently miss bugs involving cross-file interactions — for example, a PR renames a function's parameters but the review doesn't flag callers in unchanged files that still use the old argument order. Evaluation shows cross-file bugs account for 35% of production incidents from reviewed PRs. What is the most effective change to your review design?",
      "options": [
        "Redesign the review as a turn-limited agentic task where the model can read files and search the codebase via tools, following references to verify cross-file findings.",
        "Run parallel review passes per changed file with direct dependents included in each pass, then aggregate and deduplicate findings using a final summarization call.",
        "Use static analysis to build a dependency graph of changed code, then expand the prompt to include all files within two dependency hops of any changed file.",
        "Add chain-of-thought instructions asking the model to list all external references in the diff, then reason step-by-step about how each change might affect callers in other files."
      ],
      "answers": [
        "Redesign the review as a turn-limited agentic task where the model can read files and search the codebase via tools, following references to verify cross-file findings."
      ],
      "explanation": {
        "key": "<b>“Evaluation shows cross-file bugs account for 35% of production incidents from”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Redesign the review as a turn-limited agentic task where the model”</b> <i>(trong đáp án A)</i>: Lỗi là do thiếu ngữ cảnh: người gọi sống trong các tệp không thay đổi mà prompt tĩnh…",
        "elimination": [
          "<b>B. Run parallel review passes per changed file with direct dependents included in each pass, then aggregate and deduplicate findings using a final summarization call.</b>: Bỏ qua yêu cầu chính “Evaluation shows cross-file bugs account for 35% of”.",
          "<b>C. Use static analysis to build a dependency graph of changed code, then expand the prompt to include all files within two dependency hops of any changed file.</b>: Bỏ qua yêu cầu chính “Evaluation shows cross-file bugs account for 35% of”.",
          "<b>D. Add chain-of-thought instructions asking the model to list all external references in the diff, then reason step-by-step about how each change might affect callers in other files.</b>: Bỏ qua yêu cầu chính “Evaluation shows cross-file bugs account for 35% of”."
        ]
      }
    },
    {
      "number": 97,
      "topic": 1,
      "type": "mcq",
      "question": "Your search Flights tool calls an external airline API that occasionally returns a 503 Service Unavailable error. What is the most effective way to handle this error in your tool implementation?",
      "options": [
        "Return an empty flight list as if the search succeeded but found no matching flights.",
        "Log the error internally and return an empty response, letting the model continue without the flight data.",
        "Return an error message in the tool result explaining the service is temporarily unavailable.",
        "Automatically retry the request up to five times with exponential backoff before returning results to the agent."
      ],
      "answers": [
        "Automatically retry the request up to five times with exponential backoff before returning results to the agent."
      ],
      "explanation": {
        "key": "<b>“Your search Flights tool calls an external airline API that occasionally”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Automatically retry the request up to five times with exponential backoff”</b> <i>(trong đáp án D)</i>: Tự động thử lại yêu cầu tối đa năm lần với thời gian chờ theo cấp số nhân…",
        "elimination": [
          "<b>A. Return an empty flight list as if the search succeeded but found no matching flights.</b>: Bỏ qua yêu cầu chính “Your search Flights tool calls an external airline”.",
          "<b>B. Log the error internally and return an empty response, letting the model continue without the flight data.</b>: Che giấu lỗi hoặc trả kết quả rỗng làm agent không phân biệt được “không…",
          "<b>C. Return an error message in the tool result explaining the service is temporarily unavailable.</b>: Bỏ qua yêu cầu chính “Your search Flights tool calls an external airline”."
        ]
      }
    },
    {
      "number": 98,
      "topic": 1,
      "type": "mcq",
      "question": "Your agent has a log_workout tool that accepts exercise_type (string), value (number), and measurement (string). Production monitoring shows the agent frequently passes mismatched combinations-using measurement: \"reps\" for cardio exercises like running, or measurement: \"miles\" for strength exercises like bench press. Your exercises naturally divide into two categories: cardio (measured in time or distance) and strength (measured in reps and sets). 23% of tool calls have invalid combinations. What approach would most effectively reduce these errors?",
      "options": [
        "Add explicit examples to the tool description showing valid combinations (e.g., \"For running: use minutes or miles. For push-ups: use reps\") with constraints for each exercise category.",
        "Implement server-side validation returning descriptive errors for invalid combinations, allowing the agent to retry with corrections.",
        "Add enum constraints on measurement limiting values to \"minutes\", \"miles\", \"reps\", or \"sets\" to prevent arbitrary measurement strings.",
        "Split into log_cardio_workout (with duration_minutes or distance_miles parameters) and log_strength_workout (with reps and sets parameters)."
      ],
      "answers": [
        "Split into log_cardio_workout (with duration_minutes or distance_miles parameters) and log_strength_workout (with reps and sets parameters)."
      ],
      "explanation": {
        "key": "<b>“Production monitoring shows the agent frequently passes mismatched combinations-using measurement: \"reps\"”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Split into log_cardio_workout (with duration_minutes or distance_miles parameters) and log_strength_workout (with”</b> <i>(trong đáp án D)</i>: Chia thành log_cardio_workout (với thông số thời lượng_phút hoặc khoảng cách_miles) và log_ Strength_workout (với thông số số…",
        "elimination": [
          "<b>A. Add explicit examples to the tool description showing valid combinations (e.g., \"For running: use minutes or miles. For push-ups: use reps\") with constraints for each exercise category.</b>: Bỏ qua yêu cầu chính “Production monitoring shows the agent frequently passes mismatched”.",
          "<b>B. Implement server-side validation returning descriptive errors for invalid combinations, allowing the agent to retry with corrections.</b>: Retry có thể che bớt lỗi tạm thời nhưng không cung cấp cho agent loại…",
          "<b>C. Add enum constraints on measurement limiting values to \"minutes\", \"miles\", \"reps\", or \"sets\" to prevent arbitrary measurement strings.</b>: Bỏ qua yêu cầu chính “Production monitoring shows the agent frequently passes mismatched”."
        ]
      }
    },
    {
      "number": 99,
      "topic": 1,
      "type": "mcq",
      "question": "During initial testing, you notice that Claude doesn't seem to remember vocabulary words from earlier in the conversation. When a student asks \"Can you quiz me on those words?\", responds as if no words have been discussed. What is the most likely explanation?",
      "options": [
        "You're not including prior messages in each API request—the stateless API doesn't retain conversation history.",
        "The model's context window has filled up, causing earlier conversation content to be dropped.",
        "Your system prompt needs explicit instructions telling Claude to remember information from earlier turns.",
        "You need to enable conversation persistence by passing a session ID parameter with each API call."
      ],
      "answers": [
        "You're not including prior messages in each API request—the stateless API doesn't retain conversation history."
      ],
      "explanation": {
        "key": "<b>“During initial testing, you notice that Claude doesn't seem to remember”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“You're not including prior messages in each API request—the stateless API”</b> <i>(trong đáp án A)</i>: Bạn không đưa các tin nhắn trước đó vào mỗi yêu cầu API—API không trạng thái không lưu…",
        "elimination": [
          "<b>B. The model's context window has filled up, causing earlier conversation content to be dropped.</b>: Bỏ qua yêu cầu chính “During initial testing, you notice that Claude doesn't”.",
          "<b>C. Your system prompt needs explicit instructions telling Claude to remember information from earlier turns.</b>: Bỏ qua yêu cầu chính “During initial testing, you notice that Claude doesn't”.",
          "<b>D. You need to enable conversation persistence by passing a session ID parameter with each API call.</b>: Bỏ qua yêu cầu chính “During initial testing, you notice that Claude doesn't”."
        ]
      }
    },
    {
      "number": 100,
      "topic": 1,
      "type": "mcq",
      "question": "A new user's first message is \"Set up my focus music,\" This could mean configure preferences, create a playlist, or play music immediately. Your system supports all three actions. What's the effective approach?",
      "options": [
        "Ask one clarifying question about action type: play now or configure for later",
        "Start preference configuration by asking about genres, temps, and artists they prefer for focus.",
        "Play popular focus tracks Immediately and let the user redirect if needed",
        "Create a new \"Focus\" playlist with curated tracks and notify the user it's ready."
      ],
      "answers": [
        "Ask one clarifying question about action type: play now or configure for later"
      ],
      "explanation": {
        "key": "<b>“Your system supports all three actions.”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Ask one clarifying question about action type: play now or configure”</b> <i>(trong đáp án A)</i>: Hỏi một câu hỏi làm rõ về loại hành động: phát ngay hoặc định cấu hình để xem…",
        "elimination": [
          "<b>B. Start preference configuration by asking about genres, temps, and artists they prefer for focus.</b>: Bỏ qua yêu cầu chính “Your system supports all three actions”.",
          "<b>C. Play popular focus tracks Immediately and let the user redirect if needed</b>: Bỏ qua yêu cầu chính “Your system supports all three actions”.",
          "<b>D. Create a new \"Focus\" playlist with curated tracks and notify the user it's ready.</b>: Bỏ qua yêu cầu chính “Your system supports all three actions”."
        ]
      }
    },
    {
      "number": 101,
      "topic": 1,
      "type": "mcq",
      "question": "Your conversational assistant frequently generates multiple clarifying questions when users make ambiguous requests. When a user asks \"Can you help me with the report?\", the assistant responds: \"I'd be happy to help! Could you tell me: 1) Which report? 2) What kind of help—drafting, reviewing, or formatting? 3) What's your deadline?\" User analytics show a 40% conversation abandonment rate after these multi-question responses. What's the most effective way to reduce friction while appropriately handling ambiguity?",
      "options": [
        "Limit the assistant to one clarifying question per turn, using conversation history to accumulate answers over multiple exchanges rather than requesting everything upfront.",
        "Add a preprocessing step using a smaller model to classify request ambiguity on a 1-5 scale, routing high-ambiguity requests to a clarification dialog and low-ambiguity requests directly to the assistant.",
        "Modify the system prompt to instruct the assistant to make reasonable assumptions from available context, state those assumptions explicitly, and offer to adjust if the interpretation is wrong.",
        "Create a lookup table of common request patterns with predefined default interpretations, having the assistant respond with those defaults without stating the assumptions made."
      ],
      "answers": [
        "Modify the system prompt to instruct the assistant to make reasonable assumptions from available context, state those assumptions explicitly, and offer to adjust if the interpretation is wrong."
      ],
      "explanation": {
        "key": "<b>“Your conversational assistant frequently generates multiple clarifying questions when users make”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Modify the system prompt to instruct the assistant to make reasonable”</b> <i>(trong đáp án C)</i>: Sửa đổi lời nhắc của hệ thống để hướng dẫn trợ lý đưa ra các giả định hợp…",
        "elimination": [
          "<b>A. Limit the assistant to one clarifying question per turn, using conversation history to accumulate answers over multiple exchanges rather than requesting everything upfront.</b>: Bỏ qua yêu cầu chính “Your conversational assistant frequently generates multiple clarifying questions”.",
          "<b>B. Add a preprocessing step using a smaller model to classify request ambiguity on a 1-5 scale, routing high-ambiguity requests to a clarification dialog and low-ambiguity requests directly to the assistant.</b>: Bỏ qua yêu cầu chính “Your conversational assistant frequently generates multiple clarifying questions”.",
          "<b>D. Create a lookup table of common request patterns with predefined default interpretations, having the assistant respond with those defaults without stating the assumptions made.</b>: Bỏ qua yêu cầu chính “Your conversational assistant frequently generates multiple clarifying questions”."
        ]
      }
    },
    {
      "number": 102,
      "topic": 1,
      "type": "mcq",
      "question": "You need to add a date validation check ensuring event dates are in the future. This requires adding a conditional statement to one existing function in a single file. What is the most appropriate approach?",
      "options": [
        "Use direct execution to make the change",
        "Start with extended thinking mode enabled to ensure thorough reasoning about the validation logic",
        "Enter plan mode to analyze how the validation might impact other parts of the reservation flow",
        "Enter plan mode first to create a detailed implementation strategy before making the change"
      ],
      "answers": [
        "Use direct execution to make the change"
      ],
      "explanation": {
        "key": "<b>“This requires adding a conditional statement to one existing function in”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Use direct execution to make the change”</b> <i>(trong đáp án A)</i>: Sử dụng thực thi trực tiếp để thực hiện thay đổi.",
        "elimination": [
          "<b>B. Start with extended thinking mode enabled to ensure thorough reasoning about the validation logic</b>: Bỏ qua yêu cầu chính “This requires adding a conditional statement to one”.",
          "<b>C. Enter plan mode to analyze how the validation might impact other parts of the reservation flow</b>: Bỏ qua yêu cầu chính “This requires adding a conditional statement to one”.",
          "<b>D. Enter plan mode first to create a detailed implementation strategy before making the change</b>: Bỏ qua yêu cầu chính “This requires adding a conditional statement to one”."
        ]
      }
    },
    {
      "number": 103,
      "topic": 1,
      "type": "mcq",
      "question": "Your team's CLAUDE.md includes a rule: \"Use 4-space indentation and always run Prettier formatting.\" Despite this, code reviews reveal that roughly 30% of files Claude Code generates use inconsistent formatting — sometimes 2-space indentation, sometimes missing trailing commas. Adding emphasis (\"IMPORTANT: You MUST use Prettier formatting\") reduces violations to about 15%, but doesn't eliminate them. What is the most effective way to ensure all generated code is consistently formatted?",
      "options": [
        "Split the formatting rules into path-scoped .claude/rules/ files that load when Claude works on matching file types.",
        "Configure a Post ToolUse hook with an Edit|Write matcher that automatically runs Prettier on each file Claude modifies.",
        "Add a Stop hook with a prompt-based check that evaluates whether generated code follows formatting standards and prompts Claude to fix violations.",
        "Extract the formatting rules into a dedicated skill that Claude loads automatically when generating code, with more detailed examples of correct formatting."
      ],
      "answers": [
        "Configure a Post ToolUse hook with an Edit|Write matcher that automatically runs Prettier on each file Claude modifies."
      ],
      "explanation": {
        "key": "<b>“Adding emphasis (\"IMPORTANT: You MUST use Prettier formatting\") reduces violations to”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Configure a Post ToolUse hook with an Edit|Write matcher that automatically”</b> <i>(trong đáp án B)</i>: Định cấu hình hook Post ToolUse bằng trình so khớp Chỉnh sửa|Viết tự động chạy Prettier trên mỗi…",
        "elimination": [
          "<b>A. Split the formatting rules into path-scoped .claude/rules/ files that load when Claude works on matching file types.</b>: Bỏ qua yêu cầu chính “Adding emphasis (\"IMPORTANT: You MUST use Prettier formatting\")”.",
          "<b>C. Add a Stop hook with a prompt-based check that evaluates whether generated code follows formatting standards and prompts Claude to fix violations.</b>: Bash có thể thực hiện thao tác nhưng dễ vỡ và bỏ qua contract hoặc…",
          "<b>D. Extract the formatting rules into a dedicated skill that Claude loads automatically when generating code, with more detailed examples of correct formatting.</b>: Bỏ qua yêu cầu chính “Adding emphasis (\"IMPORTANT: You MUST use Prettier formatting\")”."
        ]
      }
    },
    {
      "number": 104,
      "topic": 1,
      "type": "mcq",
      "question": "You're implementing a caching layer for API responses to speed up the /products endpoint. You have a rough idea—Redis with a 5-minute TTL—but you're new to production caching and aren't sure what other considerations a robust implementation requires. What's the most effective way to start your iterative workflow?",
      "options": [
        "Start with a minimal request: \"Add Redis caching to/products with 5-minute TTL.\" Add features and fix issues through follow-up prompts as problems surface during testing.",
        "Write a specification with your known requirements and \"TBD\" markers for uncertain areas, having Claude propose solutions for each TBD as it implements.",
        "Ask Claude to interview you about the caching requirements before implementing, surfacing considerations like invalidation strategies, cache layers, consistency guarantees, and failure modes.",
        "Use plan mode to analyze the current/products endpoint implementation, then provide your caching requirements once Claude explains how the existing code is structured."
      ],
      "answers": [
        "Ask Claude to interview you about the caching requirements before implementing, surfacing considerations like invalidation strategies, cache layers, consistency guarantees, and failure modes."
      ],
      "explanation": {
        "key": "<b>“You have a rough idea—Redis with a 5-minute TTL—but you're new”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Ask Claude to interview you about the caching requirements before implementing,”</b> <i>(trong đáp án C)</i>: Yêu cầu Claude phỏng vấn bạn về các yêu cầu về bộ nhớ đệm trước khi triển khai…",
        "elimination": [
          "<b>A. Start with a minimal request: \"Add Redis caching to/products with 5-minute TTL.\" Add features and fix issues through follow-up prompts as problems surface during testing.</b>: Bỏ qua yêu cầu chính “You have a rough idea—Redis with a 5-minute”.",
          "<b>B. Write a specification with your known requirements and \"TBD\" markers for uncertain areas, having Claude propose solutions for each TBD as it implements.</b>: Bỏ qua yêu cầu chính “You have a rough idea—Redis with a 5-minute”.",
          "<b>D. Use plan mode to analyze the current/products endpoint implementation, then provide your caching requirements once Claude explains how the existing code is structured.</b>: Bỏ qua yêu cầu chính “You have a rough idea—Redis with a 5-minute”."
        ]
      }
    },
    {
      "number": 105,
      "topic": 1,
      "type": "mcq",
      "question": "You've asked Claude to write a data migration script, but the initial output doesn't correctly handle records with null values in required fields. What's the most effective way to iterate toward a working solution?",
      "options": [
        "Manually edit the generated code to fix the null handling, then continue working with Claude on other parts.",
        "Provide a test case with example input containing null values and the expected output, then ask Claude to fix it.",
        "Describe the null value problem in detail and ask Claude to regenerate the entire script with improved edge case handling.",
        "Add \"think harder about edge cases\" to your prompt and request a complete rewrite of the migration logic."
      ],
      "answers": [
        "Provide a test case with example input containing null values and the expected output, then ask Claude to fix it."
      ],
      "explanation": {
        "key": "<b>“You've asked Claude to write a data migration script, but the”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Provide a test case with example input containing null values and”</b> <i>(trong đáp án B)</i>: Cung cấp một trường hợp thử nghiệm với đầu vào mẫu chứa giá trị null và đầu ra…",
        "elimination": [
          "<b>A. Manually edit the generated code to fix the null handling, then continue working with Claude on other parts.</b>: Bỏ qua yêu cầu chính “You've asked Claude to write a data migration”.",
          "<b>C. Describe the null value problem in detail and ask Claude to regenerate the entire script with improved edge case handling.</b>: Bỏ qua yêu cầu chính “You've asked Claude to write a data migration”.",
          "<b>D. Add \"think harder about edge cases\" to your prompt and request a complete rewrite of the migration logic.</b>: Bỏ qua yêu cầu chính “You've asked Claude to write a data migration”."
        ]
      }
    },
    {
      "number": 106,
      "topic": 1,
      "type": "mcq",
      "question": "Production monitoring shows the research phase takes longer than expected. Analysis reveals the coordinator invokes the web search subagent, then invokes the document analysis subagent and waits again. These tasks are independent—neither requires the other's output. What is the most effective way to run these subagents concurrently?",
      "options": [
        "Create an async orchestration layer outside the agent that spawns parallel threads, each running a separate coordinator.",
        "Switch both subagents to use a Haiku-tier model instead of Sonnet to reduce their individual execution time.",
        "Structure the coordinator to emit both Task tool calls (for web search and document analysis) in a single response message.",
        "Add detailed instructions to the coordinator's system prompt explaining the performance benefits of parallel execution at the same time."
      ],
      "answers": [
        "Structure the coordinator to emit both Task tool calls (for web search and document analysis) in a single response message."
      ],
      "explanation": {
        "key": "<b>“These tasks are independent—neither requires the other's output.”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Structure the coordinator to emit both Task tool calls (for web”</b> <i>(trong đáp án C)</i>: Cấu trúc coordinator để phát ra cả hai lệnh tool call Tác vụ (để tìm kiếm trên web…",
        "elimination": [
          "<b>A. Create an async orchestration layer outside the agent that spawns parallel threads, each running a separate coordinator.</b>: Bỏ qua yêu cầu chính “These tasks are independent—neither requires the other's output”.",
          "<b>B. Switch both subagents to use a Haiku-tier model instead of Sonnet to reduce their individual execution time.</b>: Bỏ qua yêu cầu chính “These tasks are independent—neither requires the other's output”.",
          "<b>D. Add detailed instructions to the coordinator's system prompt explaining the performance benefits of parallel execution at the same time.</b>: Bỏ qua yêu cầu chính “These tasks are independent—neither requires the other's output”."
        ]
      }
    },
    {
      "number": 107,
      "topic": 1,
      "type": "mcq",
      "question": "Your automated review calls the Claude API for each PR, using tool_use with a report_findings tool that returns a JSON array of finding objects (each with file_path, line_number, severity, category, and description). During testing on a large PR touching 30+ files, the response hits the max_tokens limit and the output is truncated mid-JSON, causing your pipeline's parser to fail. What is the most effective way to handle this?",
      "options": [
        "Switch from tool_use to prompting Claude to return findings as a markdown list.",
        "Increase max_tokens to the model's maximum and instruct Claude to keep finding descriptions under 50 words each.",
        "Split the review into multiple API calls that each analyze a subset of the changed files, then merge the resulting findings arrays.",
        "Add retry logic that detects truncated JSON and re-sends the request with instructions to report only critical and high severity findings."
      ],
      "answers": [
        "Split the review into multiple API calls that each analyze a subset of the changed files, then merge the resulting findings arrays."
      ],
      "explanation": {
        "key": "<b>“During testing on a large PR touching 30+ files, the response”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Split the review into multiple API calls that each analyze a”</b> <i>(trong đáp án C)</i>: Chia đánh giá thành nhiều lệnh gọi API, mỗi lệnh gọi phân tích một tập hợp con của…",
        "elimination": [
          "<b>A. Switch from tool_use to prompting Claude to return findings as a markdown list.</b>: Bỏ qua yêu cầu chính “During testing on a large PR touching 30+”.",
          "<b>B. Increase max_tokens to the model's maximum and instruct Claude to keep finding descriptions under 50 words each.</b>: Bỏ qua yêu cầu chính “During testing on a large PR touching 30+”.",
          "<b>D. Add retry logic that detects truncated JSON and re-sends the request with instructions to report only critical and high severity findings.</b>: Retry có thể che bớt lỗi tạm thời nhưng không cung cấp cho agent loại…"
        ]
      }
    },
    {
      "number": 108,
      "topic": 1,
      "type": "mcq",
      "question": "An engineer sees an unfamiliar error message \"SYNC_CONFLICT: entity version mismatch detected\" in production logs but doesn't know which of the 12 services in the codebase generates it. They ask the agent to help locate the source code. What exploration approach will most efficiently find the responsible code?",
      "options": [
        "Use Grep to search for distinctive text from the error message (like \"SYNC_CONFLICT\" or \"entity version mismatch\"), then Read the matching files to understand context.",
        "Use Grep to find all files that import the project's error handling module, then Read those files to locate custom error definitions.",
        "Use Glob to find files in directories commonly associated with error handling (such as errors/, exceptions/, or handlers/) across services, then Read each matching file.",
        "Read the project's README and service configuration files to understand the architecture, then systematically Read source files in service directory."
      ],
      "answers": [
        "Use Grep to search for distinctive text from the error message (like \"SYNC_CONFLICT\" or \"entity version mismatch\"), then Read the matching files to understand context."
      ],
      "explanation": {
        "key": "<b>“They ask the agent to help locate the source code.”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Use Grep to search for distinctive text from the error message”</b> <i>(trong đáp án A)</i>: Sử dụng Grep để tìm kiếm văn bản đặc biệt từ thông báo lỗi (như \"SYNC_CONFLICT\" hoặc \"phiên…",
        "elimination": [
          "<b>B. Use Grep to find all files that import the project's error handling module, then Read those files to locate custom error definitions.</b>: Bỏ qua yêu cầu chính “They ask the agent to help locate the”.",
          "<b>C. Use Glob to find files in directories commonly associated with error handling (such as errors/, exceptions/, or handlers/) across services, then Read each matching file.</b>: Glob chủ yếu khớp tên hoặc đường dẫn tệp; nó không phải công cụ phù…",
          "<b>D. Read the project's README and service configuration files to understand the architecture, then systematically Read source files in service directory.</b>: Bỏ qua yêu cầu chính “They ask the agent to help locate the”."
        ]
      }
    },
    {
      "number": 109,
      "topic": 1,
      "type": "mcq",
      "question": "An engineer asks your agent to add comprehensive tests to a legacy codebase with 200 files and minimal existing test coverage. The engineer hasn't specified which modules to prioritize. How should the agent decompose this open-ended task?",
      "options": [
        "Systematically read all 200 files to create a complete function inventory before writing any tests, ensuring the testing plan accounts for every function before beginning.",
        "Create a fixed testing schedule upfront based on directory structure, allocating equal effort to each top-level directory regardless of code complexity or business importance.",
        "Use Glob and Grep to map codebase structure, identify heavily-coupled modules, create a prioritized plan for high-impact areas, and revise as dependencies are discovered.",
        "Start writing tests for the first module alphabetically, using test failures and imports to discover related files organically."
      ],
      "answers": [
        "Use Glob and Grep to map codebase structure, identify heavily-coupled modules, create a prioritized plan for high-impact areas, and revise as dependencies are discovered."
      ],
      "explanation": {
        "key": "<b>“The engineer hasn't specified which modules to prioritize.”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Use Glob and Grep to map codebase structure, identify heavily-coupled modules,”</b> <i>(trong đáp án C)</i>: Các biện pháp thực hành tốt nhất của nhân viên Anthropic ưu tiên việc thu thập ngữ cảnh…",
        "elimination": [
          "<b>A. Systematically read all 200 files to create a complete function inventory before writing any tests, ensuring the testing plan accounts for every function before beginning.</b>: Cách này giữ quá nhiều dữ liệu không cần thiết, làm tăng token, độ trễ…",
          "<b>B. Create a fixed testing schedule upfront based on directory structure, allocating equal effort to each top-level directory regardless of code complexity or business importance.</b>: Bash có thể thực hiện thao tác nhưng dễ vỡ và bỏ qua contract hoặc…",
          "<b>D. Start writing tests for the first module alphabetically, using test failures and imports to discover related files organically.</b>: Bỏ qua yêu cầu chính “The engineer hasn't specified which modules to prioritize”."
        ]
      }
    },
    {
      "number": 110,
      "topic": 1,
      "type": "mcq",
      "question": "Your productivity agent connects to three MCP servers: an issue tracker (search_issues, get_issue, create_comment), a documentation wiki (search_docs, get_page, list_spaces), and a database explorer (run_query, get_schema, list_databases). When engineers ask cross-system questions like \"What database tables are affected by the authentication refactor in PROJ-1234?\", monitoring shows the agent makes 8-10 sequential tool calls, frequently issues exploratory calls because it lacks visibility into what content each server contains, and exhausts context space before completing complex investigations. What architectural change best leverages MCP capabilities to address these issues?",
      "options": [
        "Consolidate all three servers into a unified MCP server with cross-referencing capabilities",
        "Expose each server's content catalog as MCP resources—issue summaries, documentation hierarchy, database schemas",
        "Add an orchestrator that routes questions to a single server based on keywords",
        "Add a prepare_investigation tool to each server that accepts a natural language question and returns relevant content summaries"
      ],
      "answers": [
        "Expose each server's content catalog as MCP resources—issue summaries, documentation hierarchy, database schemas"
      ],
      "explanation": {
        "key": "<b>“When engineers ask cross-system questions like \"What database tables are affected”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Expose each server's content catalog as MCP resources—issue summaries, documentation hierarchy,”</b> <i>(trong đáp án B)</i>: Tài nguyên MCP là giao thức nguyên thủy được thiết kế cho chính xác vấn đề này: máy…",
        "elimination": [
          "<b>A. Consolidate all three servers into a unified MCP server with cross-referencing capabilities</b>: Bỏ qua yêu cầu chính “When engineers ask cross-system questions like \"What database”.",
          "<b>C. Add an orchestrator that routes questions to a single server based on keywords</b>: Bash có thể thực hiện thao tác nhưng dễ vỡ và bỏ qua contract hoặc…",
          "<b>D. Add a prepare_investigation tool to each server that accepts a natural language question and returns relevant content summaries</b>: Bỏ qua yêu cầu chính “When engineers ask cross-system questions like \"What database”."
        ]
      }
    },
    {
      "number": 111,
      "topic": 1,
      "type": "mcq",
      "question": "The synthesis agent completes its initial pass but flags that three key research questions remain unanswered because the web search and document analysis agents didn't find relevant information on those specific subtopics. The coordinator currently proceeds directly to report generation, producing reports with incomplete coverage. What change would most effectively improve research completeness?",
      "options": [
        "Have the report generation agent note which research questions couldn't be answered, so users understand the limitations of the final output.",
        "Give the synthesis agent direct access to web search tools so it can autonomously fill knowledge gaps without returning control to the coordinator.",
        "Have the coordinator evaluate synthesis output for gaps, then re-delegate to web search and document analysis with targeted queries before Invoking synthesis again.",
        "Increase the initial breadth of queries sent to web search and document analysis to reduce the probability of missing relevant information."
      ],
      "answers": [
        "Have the coordinator evaluate synthesis output for gaps, then re-delegate to web search and document analysis with targeted queries before Invoking synthesis again."
      ],
      "explanation": {
        "key": "<b>“The coordinator currently proceeds directly to report generation, producing reports with”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Have the coordinator evaluate synthesis output for gaps, then re-delegate to”</b> <i>(trong đáp án C)</i>: Yêu cầu coordinator đánh giá kết quả tổng hợp để tìm các khoảng trống, sau đó ủy quyền…",
        "elimination": [
          "<b>A. Have the report generation agent note which research questions couldn't be answered, so users understand the limitations of the final output.</b>: Bỏ qua yêu cầu chính “The coordinator currently proceeds directly to report generation,”.",
          "<b>B. Give the synthesis agent direct access to web search tools so it can autonomously fill knowledge gaps without returning control to the coordinator.</b>: Bỏ qua yêu cầu chính “The coordinator currently proceeds directly to report generation,”.",
          "<b>D. Increase the initial breadth of queries sent to web search and document analysis to reduce the probability of missing relevant information.</b>: Bỏ qua yêu cầu chính “The coordinator currently proceeds directly to report generation,”."
        ]
      }
    },
    {
      "number": 112,
      "topic": 1,
      "type": "mcq",
      "question": "Your documents (query) tool returns results as \"Found 3 documents: Q2 Budget Proposal, Q2 Budget Forecast, Annual Review\". You want the agent to document (4, multi) and doc (24, multi). What return format would best enable these multi-step workflows?",
      "options": [
        "Structured data containing document IDs and metadata for each result.",
        "URLs that users can click to open the document in their browser.",
        "More detailed human-readable descriptions including the size and authors.",
        "A JSON array of document titles extracted from the search results."
      ],
      "answers": [
        "Structured data containing document IDs and metadata for each result."
      ],
      "explanation": {
        "key": "<b>“You want the agent to document (4, multi) and doc (24,”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Structured data containing document IDs and metadata for each result.”</b> <i>(trong đáp án A)</i>: Dữ liệu có cấu trúc chứa ID tài liệu và siêu dữ liệu cho từng kết quả.",
        "elimination": [
          "<b>B. URLs that users can click to open the document in their browser.</b>: Bỏ qua yêu cầu chính “You want the agent to document (4, multi)”.",
          "<b>C. More detailed human-readable descriptions including the size and authors.</b>: Bỏ qua yêu cầu chính “You want the agent to document (4, multi)”.",
          "<b>D. A JSON array of document titles extracted from the search results.</b>: Bỏ qua yêu cầu chính “You want the agent to document (4, multi)”."
        ]
      }
    },
    {
      "number": 113,
      "topic": 1,
      "type": "mcq",
      "question": "Your agent has access to 50+ specialized API connectors for different external services. As the connector library grew, tool selection accuracy dropped to 58%. You design a search_connectors(description) tool that finds matching connectors, but in testing agents frequently skip searching and call connectors directly (often incorrectly), or search select wrong connectors from the filtered results. How should you design the tool composition pattern to address both issues?",
      "options": [
        "Enhance all connector descriptions with detailed usage samples, edge cases, and input requirements. Add few-shot examples showing the correct search-then-use workflow.",
        "Design a find_and_execute(description, params) composite tool that searches and immediately executes the best matching connector.",
        "Design connectors with built-in compatibility validation that return descriptive errors for mismatched requests.",
        "Design search_connectors to dynamically add matched connectors to the agent's available tools. Connectors start unavailable and persist once discovered."
      ],
      "answers": [
        "Design search_connectors to dynamically add matched connectors to the agent's available tools. Connectors start unavailable and persist once discovered."
      ],
      "explanation": {
        "key": "<b>“You design a search_connectors(description) tool that finds matching connectors, but in”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Design search_connectors to dynamically add matched connectors to the agent's available”</b> <i>(trong đáp án D)</i>: Thiết kế search_connectors để tự động thêm các trình kết nối phù hợp vào các công cụ có…",
        "elimination": [
          "<b>A. Enhance all connector descriptions with detailed usage samples, edge cases, and input requirements. Add few-shot examples showing the correct search-then-use workflow.</b>: Bổ sung hướng dẫn chung có thể cải thiện phần nào nhưng không làm rõ…",
          "<b>B. Design a find_and_execute(description, params) composite tool that searches and immediately executes the best matching connector.</b>: Bỏ qua yêu cầu chính “You design a search_connectors(description) tool that finds matching”.",
          "<b>C. Design connectors with built-in compatibility validation that return descriptive errors for mismatched requests.</b>: Bỏ qua yêu cầu chính “You design a search_connectors(description) tool that finds matching”."
        ]
      }
    },
    {
      "number": 114,
      "topic": 1,
      "type": "mcq",
      "question": "Your publish article tool calls an external CMS API that occasionally returns transient errors (network timeouts, 503s) and non-transient errors (403 permission denied, 422 validation failure). Currently, every error is returned directly to the agent, which leads to the agent retrying non-transient errors and wasting turns on failures that will never succeed. How should you partition error-handling responsibility between the tool implementation and the agent?",
      "options": [
        "Surface all errors to the agent immediately with detailed context, and let the agent decide which errors to retry and how many times-keeping the tool implementation stateless and simple.",
        "Handle transient errors (timeouts, 503s) with automatic retries inside the tool implementation, and surface non-transient errors (permission denied, validation fallures) to the agent with descriptive messages so it can take corrective action.",
        "Handle all errors inside the tool: Implement retries with exponential backoff for every error type, and only surface a failure to the agent after a fixed number of retry attempts have been exhausted.",
        "Implement a universal error handler that catches all exceptions and returns a generic \"tool unavailable- try again later\" message, shielding the agent from error complexity."
      ],
      "answers": [
        "Handle transient errors (timeouts, 503s) with automatic retries inside the tool implementation, and surface non-transient errors (permission denied, validation fallures) to the agent with descriptive messages so it can take corrective action."
      ],
      "explanation": {
        "key": "<b>“Currently, every error is returned directly to the agent, which leads”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Handle transient errors (timeouts, 503s) with automatic retries inside the tool”</b> <i>(trong đáp án B)</i>: Xử lý các lỗi nhất thời (hết thời gian chờ, 503 giây) bằng tính năng tự động thử…",
        "elimination": [
          "<b>A. Surface all errors to the agent immediately with detailed context, and let the agent decide which errors to retry and how many times-keeping the tool implementation stateless and simple.</b>: Retry không thể tạo ra dữ liệu còn thiếu hoặc sửa lỗi validation, permission hay…",
          "<b>C. Handle all errors inside the tool: Implement retries with exponential backoff for every error type, and only surface a failure to the agent after a fixed number of retry attempts have been exhausted.</b>: Retry không thể tạo ra dữ liệu còn thiếu hoặc sửa lỗi validation, permission hay…",
          "<b>D. Implement a universal error handler that catches all exceptions and returns a generic \"tool unavailable- try again later\" message, shielding the agent from error complexity.</b>: Che giấu lỗi hoặc trả kết quả rỗng làm agent không phân biệt được “không…"
        ]
      }
    },
    {
      "number": 115,
      "topic": 1,
      "type": "mcq",
      "question": "Your scheduling agent uses get_available_slots(date, provider_id) to retrieve open appointment times, then book_appointment(provider_id, slot_time, patient_id) to reserve a slot. tickets show that 15% of booking attempts fall with \"slot no longer available\" because another user booked the slot between the availability check and the booking call. How should you refactor these tools?",
      "options": [
        "Combine both tools into a single find_and_book_appointment that atomically checks availability and books, returning either the confirmed booking or available alternatives.",
        "Add a hold_slot(provider_id, slot_time) tool that creates a 60 second temporary reservation, requiring the agent to call it between checking availability and booking.",
        "Modify book_appointment to return detailed failure information including currently available alternative slots when the requested slot is unavailable, enabling the agent to retry with a different time.",
        "Keep both tools but add retry logic to the agent's system prompt, instructing it to call get_available_slots again and select a different time if booking fails."
      ],
      "answers": [
        "Combine both tools into a single find_and_book_appointment that atomically checks availability and books, returning either the confirmed booking or available alternatives."
      ],
      "explanation": {
        "key": "<b>“tickets show that 15% of booking attempts fall with \"slot no”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Combine both tools into a single find_and_book_appointment that atomically checks availability”</b> <i>(trong đáp án A)</i>: Kết hợp cả hai công cụ vào một find_and_book_appointment duy nhất để kiểm tra tình trạng phòng trống…",
        "elimination": [
          "<b>B. Add a hold_slot(provider_id, slot_time) tool that creates a 60 second temporary reservation, requiring the agent to call it between checking availability and booking.</b>: Bỏ qua yêu cầu chính “tickets show that 15% of booking attempts fall”.",
          "<b>C. Modify book_appointment to return detailed failure information including currently available alternative slots when the requested slot is unavailable, enabling the agent to retry with a different time.</b>: Retry có thể che bớt lỗi tạm thời nhưng không cung cấp cho agent loại…",
          "<b>D. Keep both tools but add retry logic to the agent's system prompt, instructing it to call get_available_slots again and select a different time if booking fails.</b>: Retry có thể che bớt lỗi tạm thời nhưng không cung cấp cho agent loại…"
        ]
      }
    },
    {
      "number": 116,
      "topic": 1,
      "type": "mcq",
      "question": "Production monitoring shows your search_catalog tool fails 12% of the time: 8% are network timeouts that succeed when immediately retried, while 4% are query syntax errors from malformed user-provided filters that never succeed regardless of retry attempts. Currently, both error types are returned to the agent identically, causing it to waste turns retrying syntax errors and telling users to \"try again later\" for timeouts. How should you modify the tool's error handling?",
      "options": [
        "Return all errors with a retryable boolean flag and error type details.",
        "Implement automatic retry with backoff for network timeouts inside the tool; return syntax errors immediately with parameter validation details.",
        "Apply exponential backoff retry logic to all errors uniformly, returning a generic \"service temporarily unavailable\" message after max retries are exhausted.",
        "Add few-shot examples to your system prompt demonstrating how to distinguish network errors from syntax errors and handle each case appropriately."
      ],
      "answers": [
        "Implement automatic retry with backoff for network timeouts inside the tool; return syntax errors immediately with parameter validation details."
      ],
      "explanation": {
        "key": "<b>“Currently, both error types are returned to the agent identically, causing”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Implement automatic retry with backoff for network timeouts inside the tool;”</b> <i>(trong đáp án B)</i>: Triển khai thử lại tự động với thời gian chờ cho thời gian chờ mạng bên trong công…",
        "elimination": [
          "<b>A. Return all errors with a retryable boolean flag and error type details.</b>: Retry không thể tạo ra dữ liệu còn thiếu hoặc sửa lỗi validation, permission hay…",
          "<b>C. Apply exponential backoff retry logic to all errors uniformly, returning a generic \"service temporarily unavailable\" message after max retries are exhausted.</b>: Retry không thể tạo ra dữ liệu còn thiếu hoặc sửa lỗi validation, permission hay…",
          "<b>D. Add few-shot examples to your system prompt demonstrating how to distinguish network errors from syntax errors and handle each case appropriately.</b>: Bỏ qua yêu cầu chính “Currently, both error types are returned to the”."
        ]
      }
    },
    {
      "number": 117,
      "topic": 1,
      "type": "mcq",
      "question": "Your document extraction tool uses ML models to extract invoice fields (vendor, amount, date). The models return confidence scores (0.0-1.0) for each extracted field. In production, you observe: (1) the agent proceeds with low-confidence extractions that are incorrect 23% of the time, and (2) the agent requests unnecessary human review for 31% of extractions that were actually correct. How should you restructure the tool's output?",
      "options": [
        "Return fields with confidence scores, plus a requires_review boolean computed using your tested confidence thresholds, along with a review_reasons array explaining which fields triggered review.",
        "Return fields organized into verified and needs_verification objects based on confidence thresholds.",
        "Return fields with their raw confidence scores and add detailed few-shot examples to your system prompt demonstrating how to interpret different confidence ranges and when to request human review.",
        "Compute an aggregate extraction quality score across all fields and return it alongside the extracted values. Include a text summary describing the overall extraction reliability."
      ],
      "answers": [
        "Return fields with confidence scores, plus a requires_review boolean computed using your tested confidence thresholds, along with a review_reasons array explaining which fields triggered review."
      ],
      "explanation": {
        "key": "<b>“In production, you observe: (1) the agent proceeds with low-confidence extractions”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Return fields with confidence scores, plus a requires_review boolean computed using”</b> <i>(trong đáp án A)</i>: Trả về các trường có điểm tin cậy, cộng với boolean require_review được tính bằng ngưỡng tin cậy…",
        "elimination": [
          "<b>B. Return fields organized into verified and needs_verification objects based on confidence thresholds.</b>: Bash có thể thực hiện thao tác nhưng dễ vỡ và bỏ qua contract hoặc…",
          "<b>C. Return fields with their raw confidence scores and add detailed few-shot examples to your system prompt demonstrating how to interpret different confidence ranges and when to request human review.</b>: Bỏ qua yêu cầu chính “In production, you observe: (1) the agent proceeds”.",
          "<b>D. Compute an aggregate extraction quality score across all fields and return it alongside the extracted values. Include a text summary describing the overall extraction reliability.</b>: Bản tóm tắt văn xuôi có thể làm mất ID, con số hoặc trạng thái…"
        ]
      }
    },
    {
      "number": 118,
      "topic": 1,
      "type": "mcq",
      "question": "Your agent includes an update_game_score tool that accepts game_date (string), home_team (string), and away_team (string) parameters. Production logs reveal recurring issues: the agent uses team nicknames instead of official names, applies inconsistent date formats, and selects the wrong game when teams have rematches in the same season. What tool interface change would effectively prevent these errors?",
      "options": [
        "Add a season parameter to disambiguate rematches, and add a confirm_before_update flag that returns the resolved game details for the agent to verify before the score is committed.",
        "Add enum constraints listing valid team names for both team parameters, and add a regex pattern enforcing ISO 8601 format for the date parameter.",
        "Add detailed examples to the tool description showing the required date format and complete list of official team names.",
        "Replace the three parameters with a single game_id parameter and a separate search_games lookup tool that returns matching game IDs."
      ],
      "answers": [
        "Replace the three parameters with a single game_id parameter and a separate search_games lookup tool that returns matching game IDs."
      ],
      "explanation": {
        "key": "<b>“Production logs reveal recurring issues: the agent uses team nicknames instead”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Replace the three parameters with a single game_id parameter and a”</b> <i>(trong đáp án D)</i>: Thay thế ba tham số bằng một tham số game_id và một công cụ tra cứu search_games riêng…",
        "elimination": [
          "<b>A. Add a season parameter to disambiguate rematches, and add a confirm_before_update flag that returns the resolved game details for the agent to verify before the score is committed.</b>: Bỏ qua yêu cầu chính “Production logs reveal recurring issues: the agent uses”.",
          "<b>B. Add enum constraints listing valid team names for both team parameters, and add a regex pattern enforcing ISO 8601 format for the date parameter.</b>: Đầu ra text tự do buộc downstream hoặc model phải parse lại, làm tăng lỗi…",
          "<b>C. Add detailed examples to the tool description showing the required date format and complete list of official team names.</b>: Bỏ qua yêu cầu chính “Production logs reveal recurring issues: the agent uses”."
        ]
      }
    },
    {
      "number": 119,
      "topic": 1,
      "type": "mcq",
      "question": "You've configured the system so that all four subagents have access to the complete set of 18 tools. During testing, agents frequently call tools outside their specialization—the synthesis agent attempts web searches, and the report generator tries to analyze documents. What is the primary cause of this poor tool selection behavior?",
      "options": [
        "The coordinator cannot track which capabilities each subagent has, leading to misrouted tasks.",
        "The agents' role descriptions in their system prompts conflict with having access to tools outside that role.",
        "Choosing from 18 tools instead of 4-5 relevant ones increases decision complexity beyond reliable selection thresholds.",
        "The tool definitions consume too much context window space, leaving insufficient room for task content."
      ],
      "answers": [
        "Choosing from 18 tools instead of 4-5 relevant ones increases decision complexity beyond reliable selection thresholds."
      ],
      "explanation": {
        "key": "<b>“During testing, agents frequently call tools outside their specialization—the synthesis agent”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Choosing from 18 tools instead of 4-5 relevant ones increases decision”</b> <i>(trong đáp án C)</i>: Chọn từ 18 công cụ thay vì 4-5 công cụ phù hợp sẽ làm tăng độ phức tạp…",
        "elimination": [
          "<b>A. The coordinator cannot track which capabilities each subagent has, leading to misrouted tasks.</b>: Bỏ qua yêu cầu chính “During testing, agents frequently call tools outside their”.",
          "<b>B. The agents' role descriptions in their system prompts conflict with having access to tools outside that role.</b>: Bổ sung hướng dẫn chung có thể cải thiện phần nào nhưng không làm rõ…",
          "<b>D. The tool definitions consume too much context window space, leaving insufficient room for task content.</b>: Bỏ qua yêu cầu chính “During testing, agents frequently call tools outside their”."
        ]
      }
    },
    {
      "number": 120,
      "topic": 1,
      "type": "mcq",
      "question": "You've documented API error handling conventions in a CLAUDE.md file at your project root, specifying that endpoint handlers should use a custom ApiError class. After several sessions, you notice Claude Code sometimes follows these conventions and sometimes uses generic try/catch blocks with string messages. The inconsistency appears random across different coding sessions. What's the most efficient first diagnostic step?",
      "options": [
        "Run /memory to check which memory files are loaded and verify your CLAUDE.md is included.",
        "Create path-specific rules in claude/rules/handlers.md with YAML frontmatter scoping the error handling instructions to your API handler files.",
        "Add more detailed code examples to your CLAUDE.md showing the exact ApiError usage pattern for different endpoint types.",
        "Search for conflicting instructions in ~/.claude/CLAUDE.md or ~/.claude/rules/ that might override your project conventions."
      ],
      "answers": [
        "Run /memory to check which memory files are loaded and verify your CLAUDE.md is included."
      ],
      "explanation": {
        "key": "<b>“After several sessions, you notice Claude Code sometimes follows these conventions”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Run /memory to check which memory files are loaded and verify”</b> <i>(trong đáp án A)</i>: Chạy /memory để kiểm tra xem tệp bộ nhớ nào đã được tải và xác minh CLAUDE.md của…",
        "elimination": [
          "<b>B. Create path-specific rules in claude/rules/handlers.md with YAML frontmatter scoping the error handling instructions to your API handler files.</b>: Bỏ qua yêu cầu chính “After several sessions, you notice Claude Code sometimes”.",
          "<b>C. Add more detailed code examples to your CLAUDE.md showing the exact ApiError usage pattern for different endpoint types.</b>: Bỏ qua yêu cầu chính “After several sessions, you notice Claude Code sometimes”.",
          "<b>D. Search for conflicting instructions in ~/.claude/CLAUDE.md or ~/.claude/rules/ that might override your project conventions.</b>: Bỏ qua yêu cầu chính “After several sessions, you notice Claude Code sometimes”."
        ]
      }
    },
    {
      "number": 121,
      "topic": 1,
      "type": "mcq",
      "question": "Your CI pipeline performs security-focused code reviews on approximately 50 PRs daily, currently costing $150/day using the synchronous API. Reviews are non-blocking—developers merge after tests pass and address findings in follow-up commits. You're evaluating the Message Batches API for its 50% cost reduction. What factor most determines whether batch processing is appropriate for this use case?",
      "options": [
        "Whether you can structure each review as a single request without multi-turn refinement.",
        "Whether your result processing can handle reviews arriving in a different order than submitted.",
        "Whether reducing per-review latency from 30-60 seconds to near-instant matters for your workflow.",
        "Whether review feedback arriving up to 24 hours after PR creation remains actionable."
      ],
      "answers": [
        "Whether review feedback arriving up to 24 hours after PR creation remains actionable."
      ],
      "explanation": {
        "key": "<b>“Your CI pipeline performs security-focused code reviews on approximately 50 PRs”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Whether review feedback arriving up to 24 hours after PR creation”</b> <i>(trong đáp án D)</i>: API Lô tin nhắn không đồng bộ — hầu hết các lô kết thúc trong vòng 1 giờ…",
        "elimination": [
          "<b>A. Whether you can structure each review as a single request without multi-turn refinement.</b>: Bỏ qua yêu cầu chính “Your CI pipeline performs security-focused code reviews on”.",
          "<b>B. Whether your result processing can handle reviews arriving in a different order than submitted.</b>: Bỏ qua yêu cầu chính “Your CI pipeline performs security-focused code reviews on”.",
          "<b>C. Whether reducing per-review latency from 30-60 seconds to near-instant matters for your workflow.</b>: Bỏ qua yêu cầu chính “Your CI pipeline performs security-focused code reviews on”."
        ]
      }
    },
    {
      "number": 122,
      "topic": 1,
      "type": "mcq",
      "question": "After a 40-minute session helping plan a dinner party, the conversation has grown to 78,000 tokens. The history includes: (1) the user mentioning a guest has a severe shellfish allergy, (2) measurements for scaling recipes to 8 servings, (3) the user's clarification that \"room temperature butter\" means 68°F in their kitchen, and (4) general back-and-forth about meal timing and presentation. You need to implement context management before the window limit is reached. What approach best balances information preservation with token reduction?",
      "options": [
        "Store the full conversation externally and use semantic search to retrieve relevant portions for each turn, loading only matching segments into context.",
        "Implement a sliding window retaining only the most recent 20,000 tokens relying on users to re-state important information when relevant.",
        "Summarize the entire conversation history into a concise summary capturing main topics discussed, then append new messages going forward.",
        "Extract critical structured data (allergies, serving counts, user-defined terms) into a compact reference section, summarize general discussion, and retain recent exchanges verbatim."
      ],
      "answers": [
        "Extract critical structured data (allergies, serving counts, user-defined terms) into a compact reference section, summarize general discussion, and retain recent exchanges verbatim."
      ],
      "explanation": {
        "key": "<b>“You need to implement context management before the window limit is”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Extract critical structured data (allergies, serving counts, user-defined terms) into a”</b> <i>(trong đáp án D)</i>: Trích xuất dữ liệu có cấu trúc quan trọng (dị ứng, số lượng khẩu phần, thuật ngữ do…",
        "elimination": [
          "<b>A. Store the full conversation externally and use semantic search to retrieve relevant portions for each turn, loading only matching segments into context.</b>: Retrieval có thể hữu ích ở quy mô lớn nhưng bổ sung hạ tầng và…",
          "<b>B. Implement a sliding window retaining only the most recent 20,000 tokens relying on users to re-state important information when relevant.</b>: Sliding window chỉ giữ các turn gần nhất và có thể loại bỏ đúng dữ…",
          "<b>C. Summarize the entire conversation history into a concise summary capturing main topics discussed, then append new messages going forward.</b>: Bash có thể thực hiện thao tác nhưng dễ vỡ và bỏ qua contract hoặc…"
        ]
      }
    },
    {
      "number": 123,
      "topic": 1,
      "type": "mcq",
      "question": "Your resource allocation tool returns a simple acknowledgment message after provisioning is requested. Users frequently approve allocations and immediately ask \"how much did that cost?\" or \"which project was that?\" - indicating they confirmed without understanding the request. What tool design change would most effectively address this?",
      "options": [
        "Return structured data including cost estimate, target project, resource specifications, and impact summary in the tool response",
        "Implement a 60-second hold before execution completes, allowing users time to review pending allocations and cancel if needed",
        "Add a user_acknowledged: boolean parameter that must be set true, with instructions for the agent to only set it after the user explicitly confirms they reviewed the details",
        "Add a detail_level parameter with options \"minimal\" or \"comprehensive\" that controls how much context the agent presents in confirmations"
      ],
      "answers": [
        "Return structured data including cost estimate, target project, resource specifications, and impact summary in the tool response"
      ],
      "explanation": {
        "key": "<b>“Users frequently approve allocations and immediately ask \"how much did that”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Return structured data including cost estimate, target project, resource specifications, and”</b> <i>(trong đáp án A)</i>: Trả về dữ liệu có cấu trúc bao gồm ước tính chi phí, dự án mục tiêu, thông…",
        "elimination": [
          "<b>B. Implement a 60-second hold before execution completes, allowing users time to review pending allocations and cancel if needed</b>: Bỏ qua yêu cầu chính “Users frequently approve allocations and immediately ask \"how”.",
          "<b>C. Add a user_acknowledged: boolean parameter that must be set true, with instructions for the agent to only set it after the user explicitly confirms they reviewed the details</b>: Bỏ qua yêu cầu chính “Users frequently approve allocations and immediately ask \"how”.",
          "<b>D. Add a detail_level parameter with options \"minimal\" or \"comprehensive\" that controls how much context the agent presents in confirmations</b>: Bỏ qua yêu cầu chính “Users frequently approve allocations and immediately ask \"how”."
        ]
      }
    },
    {
      "number": 124,
      "topic": 1,
      "type": "mcq",
      "question": "Your search products tool queries an external catalog API that returns paginated results (50 items per request). Production logs show queries frequently match 200+ products, and the design that auto-fetches all pages causes 15-20 second delays. How should you redesign the pagination handling?",
      "options": [
        "Return the first page with total match count and cursor for additional pages.",
        "Implement server-side relevance ranking and return only the top 50 most relevant items.",
        "Create separate search products and fetch more results tools for pagination.",
        "Add a max pages parameter (default: 2) that controls how many pages are fetched internally."
      ],
      "answers": [
        "Return the first page with total match count and cursor for additional pages."
      ],
      "explanation": {
        "key": "<b>“Production logs show queries frequently match 200+ products, and the design”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Return the first page with total match count and cursor for”</b> <i>(trong đáp án A)</i>: Trả về trang đầu tiên với tổng số kết quả trùng khớp và con trỏ cho các trang…",
        "elimination": [
          "<b>B. Implement server-side relevance ranking and return only the top 50 most relevant items.</b>: Bỏ qua yêu cầu chính “Production logs show queries frequently match 200+ products,”.",
          "<b>C. Create separate search products and fetch more results tools for pagination.</b>: Bỏ qua yêu cầu chính “Production logs show queries frequently match 200+ products,”.",
          "<b>D. Add a max pages parameter (default: 2) that controls how many pages are fetched internally.</b>: Bỏ qua yêu cầu chính “Production logs show queries frequently match 200+ products,”."
        ]
      }
    },
    {
      "number": 125,
      "topic": 1,
      "type": "mcq",
      "question": "Your MCP server implements a check_availability tool that queries an external calendar API. During testing, you encounter three error conditions: (1) the tool is called with a malformed request, missing the required user_email parameter (2) the calendar API returns a 404 because the specified user doesn't exist in the calendar system (3) the calendar API returns a 503 because the service is temporarily unavailable. How should each error be reported according to MCP's error handling design?",
      "options": [
        "Report error 1 as a JSON-RPC protocol error, report errors 2 and 3 as tool results with isError: true",
        "Report errors 1 and 2 as JSON-RPC protocol errors, report error 3 as a tool result with isError: true",
        "Report all three as tool results with isError: true",
        "Report all three as JSON-RPC protocol errors."
      ],
      "answers": [
        "Report error 1 as a JSON-RPC protocol error, report errors 2 and 3 as tool results with isError: true"
      ],
      "explanation": {
        "key": "<b>“During testing, you encounter three error conditions: (1) the tool is”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Report error 1 as a JSON-RPC protocol error, report errors 2”</b> <i>(trong đáp án A)</i>: Báo cáo lỗi 1 là lỗi giao thức JSON-RPC, báo cáo lỗi 2 và 3 dưới dạng kết…",
        "elimination": [
          "<b>B. Report errors 1 and 2 as JSON-RPC protocol errors, report error 3 as a tool result with isError: true</b>: Bỏ qua yêu cầu chính “During testing, you encounter three error conditions: (1)”.",
          "<b>C. Report all three as tool results with isError: true</b>: Bỏ qua yêu cầu chính “During testing, you encounter three error conditions: (1)”.",
          "<b>D. Report all three as JSON-RPC protocol errors.</b>: Bỏ qua yêu cầu chính “During testing, you encounter three error conditions: (1)”."
        ]
      }
    },
    {
      "number": 126,
      "topic": 1,
      "type": "mcq",
      "question": "Your system has been running for 3 weeks and human reviewers have corrected 847 extractions. Analysis reveals a recurring pattern: when recipes use informal measurements like \"a handful\" or \"a splash,\" the model either invents specific amounts or leaves fields empty—accounting for 23% of all corrections. How should you use this feedback to improve extraction accuracy?",
      "options": [
        "Add few-shot examples to your prompt demonstrating correct handling of informal measurements— extracting them verbatim rather than converting or omitting them.",
        "Fine-tune the model on the 847 corrected extractions.",
        "Implement a post-processing layer that uses pattern matching to detect informal measurement phrases in source text and automatically populate values when the extraction is empty.",
        "Update your JSON schema to add a \"measurement_type\" enum field (precise/informal)."
      ],
      "answers": [
        "Add few-shot examples to your prompt demonstrating correct handling of informal measurements— extracting them verbatim rather than converting or omitting them."
      ],
      "explanation": {
        "key": "<b>“Analysis reveals a recurring pattern: when recipes use informal measurements like”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Add few-shot examples to your prompt demonstrating correct handling of informal”</b> <i>(trong đáp án A)</i>: Thêm một vài ví dụ ngắn gọn vào lời nhắc của bạn để thể hiện cách xử lý…",
        "elimination": [
          "<b>B. Fine-tune the model on the 847 corrected extractions.</b>: Bỏ qua yêu cầu chính “Analysis reveals a recurring pattern: when recipes use”.",
          "<b>C. Implement a post-processing layer that uses pattern matching to detect informal measurement phrases in source text and automatically populate values when the extraction is empty.</b>: Bỏ qua yêu cầu chính “Analysis reveals a recurring pattern: when recipes use”.",
          "<b>D. Update your JSON schema to add a \"measurement_type\" enum field (precise/informal).</b>: Bỏ qua yêu cầu chính “Analysis reveals a recurring pattern: when recipes use”."
        ]
      }
    },
    {
      "number": 127,
      "topic": 1,
      "type": "mcq",
      "question": "\"You're the Lead Data Scientist/Engineer on a critical project. Something is not completely right with technical details or the data, and it negative impacts expected outputs. They need to independently develop both approaches to evaluation data... How do you manage this scenario?\"",
      "options": [
        "Export the analysis session's key findings to a file, then create two new sessions that reference this file.",
        "Continue in the original session, developing end-to-end tests first, then snapshot tests sequentially.",
        "Resume the analysis session with fork_session enabled, creating a separate branch for each testing strategy.",
        "Start two fresh sessions, having each re-read the relevant source files before beginning."
      ],
      "answers": [
        "Resume the analysis session with fork_session enabled, creating a separate branch for each testing strategy."
      ],
      "explanation": {
        "key": "<b>“They need to independently develop both approaches to evaluation data...”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Resume the analysis session with fork_session enabled, creating a separate branch”</b> <i>(trong đáp án C)</i>: Tiếp tục phiên phân tích khi bật fork_session, tạo một nhánh riêng cho từng chiến lược thử nghiệm.",
        "elimination": [
          "<b>A. Export the analysis session's key findings to a file, then create two new sessions that reference this file.</b>: Bỏ qua yêu cầu chính “They need to independently develop both approaches to”.",
          "<b>B. Continue in the original session, developing end-to-end tests first, then snapshot tests sequentially.</b>: Bỏ qua yêu cầu chính “They need to independently develop both approaches to”.",
          "<b>D. Start two fresh sessions, having each re-read the relevant source files before beginning.</b>: Bỏ qua yêu cầu chính “They need to independently develop both approaches to”."
        ]
      }
    },
    {
      "number": 128,
      "topic": 1,
      "type": "mcq",
      "question": "Your automated reviewer uses a single prompt covering security issues, API design, and business logic correctness. Your evaluation suite shows strong recall findings (82%) but poor recall for business logic edge cases in quiz scoring (34%). When you add few-shot examples of logic bugs to the prompt, logic recall is 41% but API design recall drops to 68%. How should you address this trade-off to improve detection across both categories?",
      "options": [
        "Replace the few-shot examples with a detailed checklist of specific logic edge cases to verify, such as division-by-zero in score calculation or grading thresholds.",
        "Split the review into separate focused prompts - one for security and API design, another for business logic - each with dedicated examples, then combine findings before posting.",
        "Provide the full repository as context instead of just the changed files and surrounding code, giving the model deeper visibility into business logic.",
        "Upgrade to a more capable model tier, since its stronger reasoning will handle both concern types in a single prompt and eliminate the recall trade-off."
      ],
      "answers": [
        "Split the review into separate focused prompts - one for security and API design, another for business logic - each with dedicated examples, then combine findings before posting."
      ],
      "explanation": {
        "key": "<b>“Your evaluation suite shows strong recall findings (82%) but poor recall”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Split the review into separate focused prompts - one for security”</b> <i>(trong đáp án B)</i>: Chia bài đánh giá thành các lời nhắc tập trung riêng biệt - một lời nhắc dành cho…",
        "elimination": [
          "<b>A. Replace the few-shot examples with a detailed checklist of specific logic edge cases to verify, such as division-by-zero in score calculation or grading thresholds.</b>: Bỏ qua yêu cầu chính “Your evaluation suite shows strong recall findings (82%)”.",
          "<b>C. Provide the full repository as context instead of just the changed files and surrounding code, giving the model deeper visibility into business logic.</b>: Bỏ qua yêu cầu chính “Your evaluation suite shows strong recall findings (82%)”.",
          "<b>D. Upgrade to a more capable model tier, since its stronger reasoning will handle both concern types in a single prompt and eliminate the recall trade-off.</b>: Đổi model có thể cải thiện chất lượng chung nhưng không xử lý nguyên nhân…"
        ]
      }
    },
    {
      "number": 129,
      "topic": 1,
      "type": "mcq",
      "question": "Your code review assistant needs to analyze pull requests and provide feedback on three aspects: code style compliance, potential security issues, and documentation completeness. Each aspect requires reading files, running analysis tools, and generating a report section. The review process follows the same three-step workflow for every PR. Which task decomposition pattern is most appropriate for this workflow?",
      "options": [
        "Prompt chaining—break the review into sequential steps where each aspect (style, security, documentation) is analyzed separately, with outputs combined in a final synthesis step.",
        "Single comprehensive prompt—include all instructions in one prompt and let the model handle all three aspects simultaneously.",
        "Orchestrator-workers—have a central LLM analyze each PR to dynamically determine which checks are needed, then delegate to specialized worker LLMs for each identified subtask.",
        "Routing—classify each PR by type (feature, bugfix, refactor) first, then route to different review prompts optimized for that category."
      ],
      "answers": [
        "Prompt chaining—break the review into sequential steps where each aspect (style, security, documentation) is analyzed separately, with outputs combined in a final synthesis step."
      ],
      "explanation": {
        "key": "<b>“Each aspect requires reading files, running analysis tools, and generating a”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Prompt chaining—break the review into sequential steps where each aspect (style,”</b> <i>(trong đáp án A)</i>: Quy trình review luôn gồm ba bước cố định—style, security và documentation—nên prompt chaining là mẫu phù hợp…",
        "elimination": [
          "<b>B. Single comprehensive prompt—include all instructions in one prompt and let the model handle all three aspects simultaneously.</b>: Bỏ qua yêu cầu chính “Each aspect requires reading files, running analysis tools,”.",
          "<b>C. Orchestrator-workers—have a central LLM analyze each PR to dynamically determine which checks are needed, then delegate to specialized worker LLMs for each identified subtask.</b>: Bỏ qua yêu cầu chính “Each aspect requires reading files, running analysis tools,”.",
          "<b>D. Routing—classify each PR by type (feature, bugfix, refactor) first, then route to different review prompts optimized for that category.</b>: Bỏ qua yêu cầu chính “Each aspect requires reading files, running analysis tools,”."
        ]
      }
    },
    {
      "number": 130,
      "topic": 1,
      "type": "mcq",
      "question": "After the web search and document analysis subagents complete their tasks, the coordinator needs to spawn the synthesis subagent to synthesize the findings. What is the correct approach for providing the synthesis subagent with the information it needs?",
      "options": [
        "Provide the subagent with tool definitions that allow it to request outputs from other subagents via callbacks",
        "Pass reference identifiers and configure the subagent with read access to a shared memory store where other subagents deposited their results",
        "Include the complete findings from both subagents directly in the synthesis subagent's prompt",
        "Spawn the subagent with only a brief task description, relying on automatic context inheritance from the coordinator"
      ],
      "answers": [
        "Pass reference identifiers and configure the subagent with read access to a shared memory store where other subagents deposited their results"
      ],
      "explanation": {
        "key": "<b>“coordinator needs to spawn the synthesis subagent”</b> <i>(trong câu hỏi)</i>: Subagent mới không tự nhìn thấy outputs từ subagent trước — cần cơ chế truyền dữ liệu hiệu quả mà không làm bùng nổ context.<br><b>“pass reference identifiers and configure the subagent with read access to a shared memory store”</b> <i>(trong đáp án B)</i>: Reference identifiers giữ prompt nhỏ gọn; subagent tự đọc từ shared store theo nhu cầu — scalable khi findings lớn và giữ context window cho reasoning.",
        "elimination": [
          "<b>A. Provide the subagent with tool definitions to request outputs from other subagents via callbacks.</b>: Subagent gọi ngược lại subagent khác tạo coupling phức tạp và coordination overhead — không phù hợp với luồng sequential đã hoàn thành.",
          "<b>C. Include the complete findings from both subagents directly in the synthesis subagent’s prompt.</b>: Đưa toàn bộ findings vào prompt làm bùng nổ context của synthesis subagent — khi findings lớn, context window bị chiếm hết trước khi synthesis bắt đầu.",
          "<b>D. Spawn the subagent with only a brief task description, relying on automatic context inheritance.</b>: Subagent không tự kế thừa context của coordinator — không có cơ chế tự động truyền findings giữa các subagents độc lập."
        ]
      }
    },
    {
      "number": 131,
      "topic": 1,
      "type": "mcq",
      "question": "Developer Productivity An engineer asks the agent to find all files in the monorepo that import the @company/auth package to understand how authentication is used across services. Which built-in tool is most appropriate for this task?",
      "options": [
        "Bash, to execute find . -type d -name \"<i>auth</i>\" and explore matching directories",
        "Grep, to search for the import statement pattern across file contents",
        "Read, starting with package.json files to trace dependency declarations",
        "Glob, to find files with \"auth\" in their filename or path"
      ],
      "answers": [
        "Grep, to search for the import statement pattern across file contents"
      ],
      "explanation": {
        "key": "<b>“Developer Productivity An engineer asks the agent to find all files”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Grep, to search for the import statement pattern across file contents”</b> <i>(trong đáp án B)</i>: Yêu cầu là tìm các file có <b>nội dung</b> chứa import <code>@company/auth</code>, nên Grep là công cụ phù…",
        "elimination": [
          "<b>A. Bash, to execute find . -type d -name \"<i>auth</i>\" and explore matching directories</b>: Bash có thể thực hiện thao tác nhưng dễ vỡ và bỏ qua contract hoặc…",
          "<b>C. Read, starting with package.json files to trace dependency declarations</b>: Bỏ qua yêu cầu chính “Developer Productivity An engineer asks the agent to”.",
          "<b>D. Glob, to find files with \"auth\" in their filename or path</b>: Glob chủ yếu khớp tên hoặc đường dẫn tệp; nó không phải công cụ phù…"
        ]
      }
    },
    {
      "number": 132,
      "topic": 1,
      "type": "mcq",
      "question": "Your MCP server includes archive_file(file_id) and delete_file(file_id) tools. Production logs show the agent calls delete_file when users ask to \"remove old backups,\" policy requires archiving backup files. Both tools currently have minimal descriptions: \"Archives a file\" and \"Deletes a file.\" Which change most directly improves tool selection?",
      "options": [
        "Implement server-side validation that rejects delete_file calls for files tagged as backups, returning an error message suggesting archive_file.",
        "Add few-shot examples to the system prompt demonstrating that requests involving \"backup\" or \"old\" should use archive_file.",
        "Expand tool descriptions to clarify use cases, adding guidance like \"Do not use for backup files\" to delete_file.",
        "Add a confirmation step that requires users to type \"CONFIRM DELETE\" before delete_file executes."
      ],
      "answers": [
        "Expand tool descriptions to clarify use cases, adding guidance like \"Do not use for backup files\" to delete_file."
      ],
      "explanation": {
        "key": "<b>“Both tools currently have minimal descriptions: \"Archives a file\" and \"Deletes”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Expand tool descriptions to clarify use cases, adding guidance like \"Do”</b> <i>(trong đáp án C)</i>: Mở rộng mô tả công cụ để làm rõ các trường hợp sử dụng, thêm hướng dẫn như…",
        "elimination": [
          "<b>A. Implement server-side validation that rejects delete_file calls for files tagged as backups, returning an error message suggesting archive_file.</b>: Bỏ qua yêu cầu chính “Both tools currently have minimal descriptions: \"Archives a”.",
          "<b>B. Add few-shot examples to the system prompt demonstrating that requests involving \"backup\" or \"old\" should use archive_file.</b>: Bổ sung hướng dẫn chung có thể cải thiện phần nào nhưng không làm rõ…",
          "<b>D. Add a confirmation step that requires users to type \"CONFIRM DELETE\" before delete_file executes.</b>: Bỏ qua yêu cầu chính “Both tools currently have minimal descriptions: \"Archives a”."
        ]
      }
    },
    {
      "number": 133,
      "topic": 1,
      "type": "mcq",
      "question": "Your CRM agent's delete_contact tool handles requests like \"delete the duplicate entry for Acme Corp.\" The database contains similarly named records (e.g., \"Acme Corp,\" \"Acme Corporation,\" \"ACME Corp Inc.\"), and analytics show 8% of deletions are reversed within 24 hours due to misidentified records. Users have also complained that the current multi-step confirmation flow adds too much friction to routine cleanup tasks. Which approach most effectively reduces the error rate while maintaining workflow efficiency?",
      "options": [
        "Require users to supply the exact record ID from the CRM Interface rather than using natural language references to contact names.",
        "Implement soft-delete with a 30-day recovery window so users can undo mistakes without slowing down the deletion workflow.",
        "Deploy automated duplicate detection that identifies and merges probable duplicates, removing the need for manual deletion requests.",
        "Present matched records with differentiating fields and require single-click confirmation of the intended target before executing deletion."
      ],
      "answers": [
        "Present matched records with differentiating fields and require single-click confirmation of the intended target before executing deletion."
      ],
      "explanation": {
        "key": "<b>“Users have also complained that the current multi-step confirmation flow adds”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Present matched records with differentiating fields and require single-click confirmation of”</b> <i>(trong đáp án D)</i>: Trình bày các bản ghi trùng khớp với các trường khác nhau và yêu cầu xác nhận mục…",
        "elimination": [
          "<b>A. Require users to supply the exact record ID from the CRM Interface rather than using natural language references to contact names.</b>: Bỏ qua yêu cầu chính “Users have also complained that the current multi-step”.",
          "<b>B. Implement soft-delete with a 30-day recovery window so users can undo mistakes without slowing down the deletion workflow.</b>: Bỏ qua yêu cầu chính “Users have also complained that the current multi-step”.",
          "<b>C. Deploy automated duplicate detection that identifies and merges probable duplicates, removing the need for manual deletion requests.</b>: Bỏ qua yêu cầu chính “Users have also complained that the current multi-step”."
        ]
      }
    },
    {
      "number": 134,
      "topic": 1,
      "type": "mcq",
      "question": "Your team is extracting structured data from 50,000 legacy legal contracts under a two-week deadline. Initial testing with 500 sample documents shows 82% pass JSON schema first attempt, while the remaining 18% fall due to diverse issues—missing required fields, malformed dates, and incorrectly identified parties. Documents that fail typically need refinements targeting their specific failure modes. What's the most effective processing strategy?",
      "options": [
        "Use the real-time API for all 50,000 documents since the batch API's 24-hour processing window creates unacceptable deadline risk.",
        "Submit all 50,000 documents via batch API, then submit failed extractions in successive batches— refining prompts between each batch—until all documents pass validation.",
        "Split documents into 10 sequential batches of 5,000 each, analysing results and refining prompts between batches to improve extraction quality progressively.",
        "Process 2,000 sample documents via real time API to identify failure patterns and refine prompts, then batch process all 50,000 with the optimized prompts."
      ],
      "answers": [
        "Submit all 50,000 documents via batch API, then submit failed extractions in successive batches— refining prompts between each batch—until all documents pass validation."
      ],
      "explanation": {
        "key": "<b>“50,000 legacy legal contracts”</b> <i>(trong câu hỏi)</i>: Khối lượng cực lớn dưới deadline 2 tuần — batch API tối ưu hóa throughput và chi phí cho workload này.<br><b>“Submit all 50,000 via batch API, then submit failed extractions in successive batches”</b> <i>(trong đáp án B)</i>: Gửi toàn bộ qua batch (50% cost reduction, async) rồi retry failures theo batch nhỏ hơn — tối đa hóa throughput trong deadline trong khi vẫn xử lý được 18% failure rate.",
        "elimination": [
          "<b>A. Use the real-time API for all 50,000 documents...</b>: Real-time API cho 50k docs tốn gấp đôi chi phí, không có lợi thế throughput, và sẽ không kịp deadline 2 tuần với rate limits thông thường.",
          "<b>C. Split into 10 sequential batches of 5,000 each, analyzing results between batches...</b>: Sequential batches không tận dụng được async processing của batch API — bắt buộc chờ kết quả giữa các batch, kéo dài tổng thời gian không cần thiết.",
          "<b>D. Process 2,000 sample documents via real-time API to identify failure patterns first...</b>: Sampling phase lãng phí thời gian đầu trong deadline 2 tuần; failure rate 18% đã biết từ initial testing — nên đi thẳng vào batch với retry strategy."
        ]
      }
    },
    {
      "number": 135,
      "topic": 1,
      "type": "mcq",
      "question": "After deploying an updated system prompt that improves response quality, users with multi-session conversations spanning several weeks report that the assistant now contradicts its earlier statements and has a noticeably different communication style. New users don't experience these issues. What's the best approach to resolve this?",
      "options": [
        "Regenerate summaries of existing conversations using the new prompt and replace the stored histories to align past context with current behavior.",
        "Add instructions to the new system prompt directing the assistant to maintain consistency with any prior statements in the conversation history.",
        "Add a transition message when sessions resume explaining that the assistant has been updated and behavior may differ.",
        "Version system prompts and associate each conversation with the prompt version under which it started, applying updates only to new conversations."
      ],
      "answers": [
        "Version system prompts and associate each conversation with the prompt version under which it started, applying updates only to new conversations."
      ],
      "explanation": {
        "key": "<b>“After deploying an updated system prompt that improves response quality, users”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Version system prompts and associate each conversation with the prompt version”</b> <i>(trong đáp án D)</i>: sử dụng lời nhắc của hệ thống Phiên bản và liên kết từng cuộc hội thoại với phiên…",
        "elimination": [
          "<b>A. Regenerate summaries of existing conversations using the new prompt and replace the stored histories to align past context with current behavior.</b>: Bỏ qua yêu cầu chính “After deploying an updated system prompt that improves”.",
          "<b>B. Add instructions to the new system prompt directing the assistant to maintain consistency with any prior statements in the conversation history.</b>: Bỏ qua yêu cầu chính “After deploying an updated system prompt that improves”.",
          "<b>C. Add a transition message when sessions resume explaining that the assistant has been updated and behavior may differ.</b>: Bỏ qua yêu cầu chính “After deploying an updated system prompt that improves”."
        ]
      }
    },
    {
      "number": 136,
      "topic": 1,
      "type": "mcq",
      "question": "Evaluation shows 94% extraction accuracy on short meeting transcripts (<30 minutes) but only 68% on longer transcripts (>60 minutes) where discussions meander and key information is scattered throughout. Transcripts of both lengths fit within the model's context window. What pattern most effectively improves accuracy on complex, lengthy documents?",
      "options": [
        "Add few-shot examples demonstrating correct extraction from lengthy meetings with scattered Information.",
        "Upgrade to a more capable model tier for the extraction task",
        "Split lengthy transcripts Into chunks, extract from each chunk separately, then merge and deduplicate the results.",
        "Add a pre-extraction step where the model summarizes key discussions and conclusions before performing structured extraction."
      ],
      "answers": [
        "Split lengthy transcripts Into chunks, extract from each chunk separately, then merge and deduplicate the results."
      ],
      "explanation": {
        "key": "<b>“Transcripts of both lengths fit within the model's context window.”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Split lengthy transcripts Into chunks, extract from each chunk separately, then”</b> <i>(trong đáp án C)</i>: Chia các bản ghi dài thành các phần, trích xuất từ mỗi phần riêng biệt, sau đó hợp…",
        "elimination": [
          "<b>A. Add few-shot examples demonstrating correct extraction from lengthy meetings with scattered Information.</b>: Bỏ qua yêu cầu chính “Transcripts of both lengths fit within the model's”.",
          "<b>B. Upgrade to a more capable model tier for the extraction task</b>: Đổi model có thể cải thiện chất lượng chung nhưng không xử lý nguyên nhân…",
          "<b>D. Add a pre-extraction step where the model summarizes key discussions and conclusions before performing structured extraction.</b>: Bỏ qua yêu cầu chính “Transcripts of both lengths fit within the model's”."
        ]
      }
    },
    {
      "number": 137,
      "topic": 1,
      "type": "mcq",
      "question": "You're implementing a complex graph traversal algorithm with specific performance requirements and edge cases to handle (disconnected nodes, cycles, weighted edges). You want to structure your workflow for efficient iterative refinement with Claude. What approach will most effectively enable progressive improvement across multiple iterations?",
      "options": [
        "Have Claude extensively research the algorithm and create a detailed implementation plan using extended thinking, then implement the complete solution based on that plan.",
        "Write a test suite covering expected behavior, edge cases, and performance requirements before implementation. Ask Claude to write code that passes the tests, then iterate by sharing test failures with each refinement request.",
        "Provide Claude with a reference implementation from documentation, then ask it to rewrite the code to match your codebase style and add the required edge case handling, comparing outputs against the reference.",
        "Provide Claude with a detailed natural language specification of the algorithm, including all requirements and edge cases. Review each output manually and provide descriptive feedback on what behavior needs to change."
      ],
      "answers": [
        "Write a test suite covering expected behavior, edge cases, and performance requirements before implementation. Ask Claude to write code that passes the tests, then iterate by sharing test failures with each refinement request."
      ],
      "explanation": {
        "key": "<b>“You're implementing a complex graph traversal algorithm with specific performance requirements”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Write a test suite covering expected behavior, edge cases, and performance”</b> <i>(trong đáp án B)</i>: Viết một bộ thử nghiệm bao gồm các hành vi dự kiến, các trường hợp khó khăn và…",
        "elimination": [
          "<b>A. Have Claude extensively research the algorithm and create a detailed implementation plan using extended thinking, then implement the complete solution based on that plan.</b>: Bash có thể thực hiện thao tác nhưng dễ vỡ và bỏ qua contract hoặc…",
          "<b>C. Provide Claude with a reference implementation from documentation, then ask it to rewrite the code to match your codebase style and add the required edge case handling, comparing outputs against the reference.</b>: Bỏ qua yêu cầu chính “You're implementing a complex graph traversal algorithm with”.",
          "<b>D. Provide Claude with a detailed natural language specification of the algorithm, including all requirements and edge cases. Review each output manually and provide descriptive feedback on what behavior needs to change.</b>: Bỏ qua yêu cầu chính “You're implementing a complex graph traversal algorithm with”."
        ]
      }
    },
    {
      "number": 138,
      "topic": 1,
      "type": "mcq",
      "question": "Your infrastructure-as-code repository includes Terraform modules (/terraform/), Kubernetes manifests (/kubernetes/), and CI/CD pipeline scripts (/pipelines/). Each requires different conventions, but your single root CLAUDE.md has grown to 500+ lines. When developers work on Kubernetes files, Terraform-specific rules load into context unnecessarily, consuming tokens. What is the best approach to reorganize so only relevant guidance loads when editing specific file types?",
      "options": [
        "Keep the root CLAUDE.md and use @path/to/import syntax to modularly include tool-specific guidance files from separate documents.",
        "Split content into subdirectory CLAUDE.md files (/terraform/CLAUDE.md, /kubernetes/CLAUDE.md), so Claude loads directory-specific guidance.",
        "Restructure the root CLAUDE.md into clearly labeled sections with headers (e.g., \"## Terraform Conventions\"), improving organization and readability.",
        "Create files in .claude/rules/ with YAML frontmatter path-scoping (e.g., paths: [\"terraform/**/*\"]), loading rules only when editing matching files."
      ],
      "answers": [
        "Create files in .claude/rules/ with YAML frontmatter path-scoping (e.g., paths: [\"terraform/**/*\"]), loading rules only when editing matching files."
      ],
      "explanation": {
        "key": "<b>“When developers work on Kubernetes files, Terraform-specific rules load into context”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Create files in .claude/rules/ with YAML frontmatter path-scoping (e.g., paths: [\"terraform/</b>/<i>\"]),”<b> </i>(trong đáp án D)<i>: Tạo tệp trong .claude/rules/ với phạm vi đường dẫn của YAML frontmatter (ví dụ: đường dẫn: [\"terraform/</b>/</i>\"]), chỉ…",
        "elimination": [
          "<b>A. Keep the root CLAUDE.md and use @path/to/import syntax to modularly include tool-specific guidance files from separate documents.</b>: Bỏ qua yêu cầu chính “When developers work on Kubernetes files, Terraform-specific rules”.",
          "<b>B. Split content into subdirectory CLAUDE.md files (/terraform/CLAUDE.md, /kubernetes/CLAUDE.md), so Claude loads directory-specific guidance.</b>: Bỏ qua yêu cầu chính “When developers work on Kubernetes files, Terraform-specific rules”.",
          "<b>C. Restructure the root CLAUDE.md into clearly labeled sections with headers (e.g., \"## Terraform Conventions\"), improving organization and readability.</b>: Bỏ qua yêu cầu chính “When developers work on Kubernetes files, Terraform-specific rules”."
        ]
      }
    },
    {
      "number": 139,
      "topic": 1,
      "type": "mcq",
      "question": "After expanding the agent's MCP tools with delivery-specific capabilities (check_delivery_status, contact_driver, issue_credit, apply_promo_code, update_delivery_address, reschedule_delivery), the total tool count has grown from 4 to 10. Your evaluation suite shows tool selection accuracy has dropped to 71%. Log analysis reveals the majority of errors involve the agent selecting between semantically overlapping tools- calling issue_credit when process_refund is correct, and calling check_delivery_status when lookup_order already returns the needed data. Which approach structurally eliminates the semantic overlaps that are being logged as the error source?",
      "options": [
        "Split the tools across two sub-agents - a \"financial resolution\" agent with process_refund, issue_credit, and apply_promo_code, and a \"delivery\" agent with the remaining delivery tools - with a coordinator routing between them.",
        "Consolidate semantically overlapping tools-merge issue_credit and process_refund into a single resolve_compensation tool with an optional include_tracking flag.",
        "Enable the tool search tool with defer_loading on the six new tools, keeping the original four always loaded, so the agent dynamically calls it when needed.",
        "Add few-shot examples to the system prompt demonstrating correct selection for each ambiguous tool pair, such as showing when issue_credit or process_refund is appropriate."
      ],
      "answers": [
        "Consolidate semantically overlapping tools-merge issue_credit and process_refund into a single resolve_compensation tool with an optional include_tracking flag."
      ],
      "explanation": {
        "key": "<b>“Log analysis reveals the majority of errors involve the agent selecting”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Consolidate semantically overlapping tools-merge issue_credit and process_refund into a single resolve_compensation”</b> <i>(trong đáp án B)</i>: Hợp nhất các công cụ chồng chéo về mặt ngữ nghĩa-hợp nhất issue_credit và process_refund vào một công…",
        "elimination": [
          "<b>A. Split the tools across two sub-agents - a \"financial resolution\" agent with process_refund, issue_credit, and apply_promo_code, and a \"delivery\" agent with the remaining delivery tools - with a coordinator routing between them.</b>: Bỏ qua yêu cầu chính “Log analysis reveals the majority of errors involve”.",
          "<b>C. Enable the tool search tool with defer_loading on the six new tools, keeping the original four always loaded, so the agent dynamically calls it when needed.</b>: Bỏ qua yêu cầu chính “Log analysis reveals the majority of errors involve”.",
          "<b>D. Add few-shot examples to the system prompt demonstrating correct selection for each ambiguous tool pair, such as showing when issue_credit or process_refund is appropriate.</b>: Bổ sung hướng dẫn chung có thể cải thiện phần nào nhưng không làm rõ…"
        ]
      }
    },
    {
      "number": 140,
      "topic": 1,
      "type": "mcq",
      "question": "After expanding the agent's MCP tools with delivery-specific capabilities [apply_promo_code, update_delivery_address, reconcile_delivery], the total tool count has grown from 1 to 7. We have observed that the agent now shows tool selection accuracy has dropped from 86% to 71%. Log analysis reveals the majority of errors involve the agent selecting between semantically overlapping tools — calling issue_credit when process_refund was correct, and calling check_delivery_status when looking order_allready_returns_the_needed_data. Which approach structurally eliminates the semantic overlap identified in the error source?",
      "options": [
        "Add few-shot examples to the system prompt demonstrating correct selection for each ambiguous tool, such as showing when issue_credit applies versus when process_refund is appropriate.",
        "Enable the tool search tool with defer_loading on the six new tools, keeping the original two always loaded, so the agent dynamically discovers specialized tools only when needed.",
        "Split the tools across two sub-agents — a 'financial resolution' agent with issue_credit, process_refund, return_order, and apply_promo_code and a 'delivery operations' agent with the remaining delivery tools — with a coordinating routing between them.",
        "Consolidate semantically overlapping tools – merge issue_credit and process_refund into a single handle_promotions tool with an action parameter and fold check_delivery_status into lookup_order with an optional include_tracking flag."
      ],
      "answers": [
        "Consolidate semantically overlapping tools – merge issue_credit and process_refund into a single handle_promotions tool with an action parameter and fold check_delivery_status into lookup_order with an optional include_tracking flag."
      ],
      "explanation": {
        "key": "<b>“Log analysis reveals the majority of errors involve the agent selecting”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Consolidate semantically overlapping tools – merge issue_credit and process_refund into a”</b> <i>(trong đáp án D)</i>: Hợp nhất các công cụ chồng chéo về mặt ngữ nghĩa – hợp nhất issue_credit và process_refund vào…",
        "elimination": [
          "<b>A. Add few-shot examples to the system prompt demonstrating correct selection for each ambiguous tool, such as showing when issue_credit applies versus when process_refund is appropriate.</b>: Bổ sung hướng dẫn chung có thể cải thiện phần nào nhưng không làm rõ…",
          "<b>B. Enable the tool search tool with defer_loading on the six new tools, keeping the original two always loaded, so the agent dynamically discovers specialized tools only when needed.</b>: Bỏ qua yêu cầu chính “Log analysis reveals the majority of errors involve”.",
          "<b>C. Split the tools across two sub-agents — a 'financial resolution' agent with issue_credit, process_refund, return_order, and apply_promo_code and a 'delivery operations' agent with the remaining delivery tools — with a coordinating routing between them.</b>: Bỏ qua yêu cầu chính “Log analysis reveals the majority of errors involve”."
        ]
      }
    },
    {
      "number": 141,
      "topic": 1,
      "type": "mcq",
      "question": "Your order management system requires tools for three distinct operations: issuing refunds (requires amount and reason), canceling orders (requires reason), and res (requires shipping address). Each operation shares an order id parameter but has different additional requirements. You notice during testing that with your current frequently omits required parameters or includes irrelevant ones. What design change will most effectively improve parameter accuracy?",
      "options": [
        "Keep one unified tool with a nested operation object parameter whose internal structure varies by operation type, documented in the tool description.",
        "Split into three separate tools (each defining only the parameters required for that specific operation.",
        "Keep one unified tool but add JSON Schema if-then-else conditionals to enforce that parameters like amount are required only when the operation type is \"refund\".",
        "Keep one unified tool with all parameters marked optional, but add few-shot examples in the system prompt showing correct parameter combinations for each operation."
      ],
      "answers": [
        "Split into three separate tools (each defining only the parameters required for that specific operation."
      ],
      "explanation": {
        "key": "<b>“You notice during testing that with your current frequently omits required”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Split into three separate tools (each defining only the parameters required”</b> <i>(trong đáp án B)</i>: Chia thành ba công cụ riêng biệt (mỗi công cụ chỉ xác định các tham số cần thiết…",
        "elimination": [
          "<b>A. Keep one unified tool with a nested operation object parameter whose internal structure varies by operation type, documented in the tool description.</b>: Một tool có nhiều mode và bộ tham số điều kiện làm schema khó hiểu…",
          "<b>C. Keep one unified tool but add JSON Schema if-then-else conditionals to enforce that parameters like amount are required only when the operation type is \"refund\".</b>: Một tool có nhiều mode và bộ tham số điều kiện làm schema khó hiểu…",
          "<b>D. Keep one unified tool with all parameters marked optional, but add few-shot examples in the system prompt showing correct parameter combinations for each operation.</b>: Một tool có nhiều mode và bộ tham số điều kiện làm schema khó hiểu…"
        ]
      }
    },
    {
      "number": 142,
      "topic": 1,
      "type": "mcq",
      "question": "Your fitness coaching assistant uses a system prompt with detailed conditional logic: \"If the user mentions being a beginner, provide step-by-step form instructions. If they use term 'progressive overload' or 'superset', respond concisely. If they ask about injury history, always recommend consulting a physician.\" During evaluation, you find the assistant correct explicit expertise declarations but struggles when users don't clearly state their level-often defaulting to overly detailed responses regardless of contextual cues like technical terms. Which change to the system prompt would most directly address this failure to pick up on implicit expertise signals?",
      "options": [
        "Implement a pre-conversation intake that asks users to rate their experience level, then inject that rating into the system prompt as context for all subsequent responses.",
        "Add more conditional branches to cover additional expertise signals, such as \"If user mentions specific rep ranges or asks about periodization, treat as advanced.\"",
        "Replace most conditionals with a general principle: \"Adapt explanation depth to match user expertise, mirroring their terminology.\" Keep only the safety-critical conditional abou consultations.",
        "Add an explicit instruction for the model to ask a clarifying question about experience level whenever the user's expertise isn't immediately clear from their first message."
      ],
      "answers": [
        "Replace most conditionals with a general principle: \"Adapt explanation depth to match user expertise, mirroring their terminology.\" Keep only the safety-critical conditional abou consultations."
      ],
      "explanation": {
        "key": "<b>“If they ask about injury history, always recommend consulting a physician.\"”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Replace most conditionals with a general principle: \"Adapt explanation depth to”</b> <i>(trong đáp án C)</i>: Thay thế hầu hết các điều kiện bằng một nguyên tắc chung: \"Điều chỉnh độ sâu giải thích…",
        "elimination": [
          "<b>A. Implement a pre-conversation intake that asks users to rate their experience level, then inject that rating into the system prompt as context for all subsequent responses.</b>: Bỏ qua yêu cầu chính “If they ask about injury history, always recommend”.",
          "<b>B. Add more conditional branches to cover additional expertise signals, such as \"If user mentions specific rep ranges or asks about periodization, treat as advanced.\"</b>: Bỏ qua yêu cầu chính “If they ask about injury history, always recommend”.",
          "<b>D. Add an explicit instruction for the model to ask a clarifying question about experience level whenever the user's expertise isn't immediately clear from their first message.</b>: Bỏ qua yêu cầu chính “If they ask about injury history, always recommend”."
        ]
      }
    },
    {
      "number": 143,
      "topic": 1,
      "type": "mcq",
      "question": "You're building a security scanning workflow. When engineers need to locate all occurrences of a dangerous function like eval() across a large codebase, which tool should your agent use for content search?",
      "options": [
        "Use Bash to run ls -R | grep eval to recursively list files containing eval.",
        "Use Glob with a pattern like /<i>eval</i> to find files, then Read each matching file.",
        "Read the project's main entry file and follow import statements to trace where eval might be used.",
        "Use Grep to search for the pattern \"eval(\" across all files in the codebase."
      ],
      "answers": [
        "Use Grep to search for the pattern \"eval(\" across all files in the codebase."
      ],
      "explanation": {
        "key": "<b>“You're building a security scanning workflow.”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Use Grep to search for the pattern \"eval(\" across all files”</b> <i>(trong đáp án D)</i>: Grep là công cụ tìm kiếm nội dung được xây dựng có mục đích (dựa trên ripgrep) để…",
        "elimination": [
          "<b>A. Use Bash to run ls -R | grep eval to recursively list files containing eval.</b>: Bash có thể thực hiện thao tác nhưng dễ vỡ và bỏ qua contract hoặc…",
          "<b>B. Use Glob with a pattern like /<i>eval</i> to find files, then Read each matching file.</b>: Glob chủ yếu khớp tên hoặc đường dẫn tệp; nó không phải công cụ phù…",
          "<b>C. Read the project's main entry file and follow import statements to trace where eval might be used.</b>: Bash có thể thực hiện thao tác nhưng dễ vỡ và bỏ qua contract hoặc…"
        ]
      }
    },
    {
      "number": 144,
      "topic": 1,
      "type": "mcq",
      "question": "Your test generation produces unit tests for new code, but reviews show 55% are low-value: trivial assertions that only verify functions don't throw exceptions, tests duplicating existing coverage, or tests ignoring your team's fixture conventions. How do you reduce the rate of low-value tests being generated in the first place?",
      "options": [
        "Document testing standards in CLAUDE.md including valuable test criteria, available fixtures with intended use cases, and examples distinguishing meaningful behavioral tests from trivial assertions.",
        "Add post-generation coverage analysis that automatically filters out any generated test that doesn't increase line coverage beyond what existing tests provide.",
        "Implement a two-phase generation where a second Claude call scores each test against quality criteria, filtering out low-scoring tests before presenting results to developers.",
        "Restrict test generation to directories where historical quality metrics show higher acceptance rates, disabling it for areas where generated tests consistently require heavy editing."
      ],
      "answers": [
        "Document testing standards in CLAUDE.md including valuable test criteria, available fixtures with intended use cases, and examples distinguishing meaningful behavioral tests from trivial assertions."
      ],
      "explanation": {
        "key": "<b>“Your test generation produces unit tests for new code, but reviews”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Document testing standards in CLAUDE.md including valuable test criteria, available fixtures”</b> <i>(trong đáp án A)</i>: Câu hỏi hỏi rõ ràng cách giảm bớt các bài kiểm tra giá trị thấp \"được tạo ra…",
        "elimination": [
          "<b>B. Add post-generation coverage analysis that automatically filters out any generated test that doesn't increase line coverage beyond what existing tests provide.</b>: Bỏ qua yêu cầu chính “Your test generation produces unit tests for new”.",
          "<b>C. Implement a two-phase generation where a second Claude call scores each test against quality criteria, filtering out low-scoring tests before presenting results to developers.</b>: Bỏ qua yêu cầu chính “Your test generation produces unit tests for new”.",
          "<b>D. Restrict test generation to directories where historical quality metrics show higher acceptance rates, disabling it for areas where generated tests consistently require heavy editing.</b>: Bỏ qua yêu cầu chính “Your test generation produces unit tests for new”."
        ]
      }
    },
    {
      "number": 145,
      "topic": 1,
      "type": "mcq",
      "question": "Your expense reimbursement agent processes employee requests using a process reimbursement tool. Company policy requires that reimbursements above $500 must be approved before funds are disbursed. The agent handles hundreds of requests daily, and you need the threshold enforcement to be tamper-proof regardless of how the agent is prompted ensures the $500 approval threshold cannot be bypassed?",
      "options": [
        "The process reimbursement tool accepts an approved by manager parameter. The system prompt instructs the agent to only set this to true after confirming that a manager approved the request. A nightly audit script reviews all reimbursements where approved by manager was set to true.",
        "Implement the threshold check in a PreToolUse hook that inspects the amount parameter before process reimbursement executes. If the amount exceeds $500, the hook modifies the context to add a requires approval: true flag, which the tool checks before disbursing.",
        "The process reimbursement tool accepts amount and details, and internally enforces the threshold; amounts <$500 are auto-disbursed and the tool returns a success confirmation. Amounts >$500 cause the tool to create a pending approval request and return a status indicating manager review is pending.",
        "Provide two tools: auto reimburse (hard-coded limit of $500) and manager approval. Include detailed system prompt instructions telling the agent to check the amount and use the appropriate tool. Add a Post ToolUse hook that logs which tool was called for auditing."
      ],
      "answers": [
        "The process reimbursement tool accepts amount and details, and internally enforces the threshold; amounts <$500 are auto-disbursed and the tool returns a success confirmation. Amounts >$500 cause the tool to create a pending approval request and return a status indicating manager review is pending."
      ],
      "explanation": {
        "key": "<b>“Company policy requires that reimbursements above $500 must be approved before”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“The process reimbursement tool accepts amount and details, and internally enforces”</b> <i>(trong đáp án C)</i>: Công cụ hoàn trả theo quy trình chấp nhận số tiền và thông tin chi tiết, đồng thời…",
        "elimination": [
          "<b>A. The process reimbursement tool accepts an approved by manager parameter. The system prompt instructs the agent to only set this to true after confirming that a manager approved the request. A nightly audit script reviews all reimbursements where approved by manager was set to true.</b>: Prompt và ví dụ chỉ định hướng hành vi xác suất; chúng không thể bảo…",
          "<b>B. Implement the threshold check in a PreToolUse hook that inspects the amount parameter before process reimbursement executes. If the amount exceeds $500, the hook modifies the context to add a requires approval: true flag, which the tool checks before disbursing.</b>: Bỏ qua yêu cầu chính “Company policy requires that reimbursements above $500 must”.",
          "<b>D. Provide two tools: auto reimburse (hard-coded limit of $500) and manager approval. Include detailed system prompt instructions telling the agent to check the amount and use the appropriate tool. Add a Post ToolUse hook that logs which tool was called for auditing.</b>: Prompt và ví dụ chỉ định hướng hành vi xác suất; chúng không thể bảo…"
        ]
      }
    },
    {
      "number": 146,
      "topic": 1,
      "type": "mcq",
      "question": "Your portfolio value tool returns the total value of a user's investment portfolio. You're deciding between returning a structured JSON object with explicit fields versus returning information as a formatted text string. What is the primary advantage of using structured output with defined fields?",
      "options": [
        "JSON schemas automatically validate that the underlying API returned correct data before the agent processes it.",
        "Structured JSON is processed deterministically by the model, significantly improving accuracy when extracting values.",
        "The agent can reliably extract specific values without parsing free form text, reducing errors in subsequent operations.",
        "Structured JSON consumes significantly fewer tokens than natural language, substantially reducing API costs."
      ],
      "answers": [
        "The agent can reliably extract specific values without parsing free form text, reducing errors in subsequent operations."
      ],
      "explanation": {
        "key": "<b>“You're deciding between returning a structured JSON object with explicit fields”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“The agent can reliably extract specific values without parsing free form”</b> <i>(trong đáp án C)</i>: Tác nhân có thể trích xuất các giá trị cụ thể một cách đáng tin cậy mà không…",
        "elimination": [
          "<b>A. JSON schemas automatically validate that the underlying API returned correct data before the agent processes it.</b>: Bỏ qua yêu cầu chính “You're deciding between returning a structured JSON object”.",
          "<b>B. Structured JSON is processed deterministically by the model, significantly improving accuracy when extracting values.</b>: Bash có thể thực hiện thao tác nhưng dễ vỡ và bỏ qua contract hoặc…",
          "<b>D. Structured JSON consumes significantly fewer tokens than natural language, substantially reducing API costs.</b>: Bỏ qua yêu cầu chính “You're deciding between returning a structured JSON object”."
        ]
      }
    },
    {
      "number": 147,
      "topic": 1,
      "type": "mcq",
      "question": "Performance analysis reveals your context is composed of accumulated RAG results from all previous queries, which is crowding out conversation history and causing coherence degradation after 15+ turns. Which approach best addresses this issue?",
      "options": [
        "Compress all RAG results into a consolidated summary document that updates incrementally after each retrieval",
        "Implement a sliding window for RAG results from the last 2-3 queries while preserving conversation history",
        "Implement semantic deduplication to identify and remove redundant information across the accumulated RAG results and conversation turns",
        "Shift context budget to favor RAG results while reducing conversation history allocation"
      ],
      "answers": [
        "Implement a sliding window for RAG results from the last 2-3 queries while preserving conversation history"
      ],
      "explanation": {
        "key": "<b>“Performance analysis reveals your context is composed of accumulated RAG results”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Implement a sliding window for RAG results from the last 2-3”</b> <i>(trong đáp án B)</i>: Triển khai cửa sổ trượt cho kết quả RAG từ 2-3 truy vấn gần đây nhất trong khi…",
        "elimination": [
          "<b>A. Compress all RAG results into a consolidated summary document that updates incrementally after each retrieval</b>: Bỏ qua yêu cầu chính “Performance analysis reveals your context is composed of”.",
          "<b>C. Implement semantic deduplication to identify and remove redundant information across the accumulated RAG results and conversation turns</b>: Bỏ qua yêu cầu chính “Performance analysis reveals your context is composed of”.",
          "<b>D. Shift context budget to favor RAG results while reducing conversation history allocation</b>: Bỏ qua yêu cầu chính “Performance analysis reveals your context is composed of”."
        ]
      }
    },
    {
      "number": 148,
      "topic": 1,
      "type": "mcq",
      "question": "Your team frequently migrates React components to Vue. You've written a step-by-step workflow for Claude Code to follow during each migration, and you want every developer on the team to invoke it by typing /migrate-component. The workflow should stay in sync as the team iterates on it. Where should you place the skill file?",
      "options": [
        "In the project's .claude/settings.json using a skillOverrides entry to register and define the workflow",
        "In .claude/skills/migrate-component/SKILL.md at the project root, committed to version control",
        "In ~/.claude/skills/migrate-component/SKILL.md on each developer's machine",
        "As a detailed instruction block in the project's root CLAUDE.md file"
      ],
      "answers": [
        "In .claude/skills/migrate-component/SKILL.md at the project root, committed to version control"
      ],
      "explanation": {
        "key": "<b>“Your team frequently migrates React components to Vue.”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“In .claude/skills/migrate-component/SKILL.md at the project root, committed to version control”</b> <i>(trong đáp án B)</i>: Trong .claude/skills/migrate-comComponent/SKILL.md ở gốc dự án, cam kết kiểm soát phiên bản.",
        "elimination": [
          "<b>A. In the project's .claude/settings.json using a skillOverrides entry to register and define the workflow</b>: Bỏ qua yêu cầu chính “Your team frequently migrates React components to Vue”.",
          "<b>C. In ~/.claude/skills/migrate-component/SKILL.md on each developer's machine</b>: Bỏ qua yêu cầu chính “Your team frequently migrates React components to Vue”.",
          "<b>D. As a detailed instruction block in the project's root CLAUDE.md file</b>: Bỏ qua yêu cầu chính “Your team frequently migrates React components to Vue”."
        ]
      }
    },
    {
      "number": 149,
      "topic": 1,
      "type": "mcq",
      "question": "The system processes product reviews using tool use with a defined schema: rating (integer 1-5), pros (string array), cons (string array), and overall_sentiment (enum: positive, negative, mixed). Testing reveals two issues with brief or ambiguous reviews (~20% of the dataset): (1) for reviews like \"Great product!\", Claude fabricates specific pros and cons rather than indicating this information isn't explicitly stated, and (2) for sarcastic reviews like \"Well that was... interesting\", Claude picks sentiment arbitrarily since there's no option for ambiguous cases. What schema modification best addresses both issues?",
      "options": [
        "Allow null values for pros/cons, and add \"unclear\" to the sentiment enum.",
        "Make pros and cons optional fields, and add \"neutral\" and \"unclear\" to the sentiment enum.",
        "Add an extraction_confidence field (0.0-1.0) for each value, and filter outputs where any confidence falls below a threshold.",
        "Allow empty arrays for pros/cons as valid output, and add \"unclear\" to the sentiment enum."
      ],
      "answers": [
        "Allow empty arrays for pros/cons as valid output, and add \"unclear\" to the sentiment enum."
      ],
      "explanation": {
        "key": "<b>“Testing reveals two issues with brief or ambiguous reviews (~20% of”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Allow empty arrays for pros/cons as valid output, and add \"unclear\"”</b> <i>(trong đáp án D)</i>: Cho phép các mảng trống cho ưu/nhược điểm làm đầu ra hợp lệ và thêm \"không rõ ràng\"…",
        "elimination": [
          "<b>A. Allow null values for pros/cons, and add \"unclear\" to the sentiment enum.</b>: Bỏ qua yêu cầu chính “Testing reveals two issues with brief or ambiguous”.",
          "<b>B. Make pros and cons optional fields, and add \"neutral\" and \"unclear\" to the sentiment enum.</b>: Bỏ qua yêu cầu chính “Testing reveals two issues with brief or ambiguous”.",
          "<b>C. Add an extraction_confidence field (0.0-1.0) for each value, and filter outputs where any confidence falls below a threshold.</b>: Bỏ qua yêu cầu chính “Testing reveals two issues with brief or ambiguous”."
        ]
      }
    },
    {
      "number": 150,
      "topic": 1,
      "type": "mcq",
      "question": "Production logs show that when the agent handles complex billing disputes requiring 6+ tool calls, it sometimes exhausts its max_turns limit after gathering data and before completing resolution or escalating. The team's goal is to guarantee that every customer interaction ends with either a completed resolution or a human escalation, regardless of how the agent loop terminates. Which approach achieves this guarantee?",
      "options": [
        "Add orchestration-layer code that checks the agent's outcome after each loop termination - if the loop ended without a completed resolution or escalation, programmatically call escalate_to_human with the accumulated conversation context and tool results.",
        "Add system prompt instructions telling the agent to call escalate_to_human with a summary of its findings whenever it determines it cannot resolve the dispute.",
        "Split the workflow into two sequential agent invocations — a first agent gathers information via get_customer and lookup_order, then the second agent uses that data and handles process_refund or escalate_to_human, each with separate turn budgets.",
        "Implement a pre-tool-use hook that counts tool invocations and terminates the loop with an automatic escalation once the agent reaches 80% of its remaining actions."
      ],
      "answers": [
        "Add orchestration-layer code that checks the agent's outcome after each loop termination - if the loop ended without a completed resolution or escalation, programmatically call escalate_to_human with the accumulated conversation context and tool results."
      ],
      "explanation": {
        "key": "<b>“The team's goal is to guarantee that every customer interaction ends”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Add orchestration-layer code that checks the agent's outcome after each loop”</b> <i>(trong đáp án A)</i>: Thêm mã lớp điều phối để kiểm tra kết quả của agent sau mỗi lần kết thúc vòng…",
        "elimination": [
          "<b>B. Add system prompt instructions telling the agent to call escalate_to_human with a summary of its findings whenever it determines it cannot resolve the dispute.</b>: Prompt và ví dụ chỉ định hướng hành vi xác suất; chúng không thể bảo…",
          "<b>C. Split the workflow into two sequential agent invocations — a first agent gathers information via get_customer and lookup_order, then the second agent uses that data and handles process_refund or escalate_to_human, each with separate turn budgets.</b>: Bỏ qua yêu cầu chính “The team's goal is to guarantee that every”.",
          "<b>D. Implement a pre-tool-use hook that counts tool invocations and terminates the loop with an automatic escalation once the agent reaches 80% of its remaining actions.</b>: Bỏ qua yêu cầu chính “The team's goal is to guarantee that every”."
        ]
      }
    },
    {
      "number": 151,
      "topic": 1,
      "type": "mcq",
      "question": "A developer uses Claude Code to refactor a function during their development session. Before committing, they ask the same Claude session to review the code for issues. Later, a separate automated CI review catches several bugs that the same-session review missed. What best explains this discrepancy?",
      "options": [
        "The CI environment has access to the full codebase context while the local session only sees the current file",
        "Claude retains context about its prior reasoning in the session, making it less likely to question its own decisions",
        "The extended session length caused the context window to fill with conversation history, leaving less room for thorough analysis",
        "The CI review uses a more specific prompt tailored for catching bugs, while the developer's request was too general"
      ],
      "answers": [
        "Claude retains context about its prior reasoning in the session, making it less likely to question its own decisions"
      ],
      "explanation": {
        "key": "<b>“Later, a separate automated CI review catches several bugs that the”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Claude retains context about its prior reasoning in the session, making”</b> <i>(trong đáp án B)</i>: để Claude giữ lại bối cảnh về lý do trước đó của anh ấy trong phiên họp, khiến…",
        "elimination": [
          "<b>A. The CI environment has access to the full codebase context while the local session only sees the current file</b>: Bỏ qua yêu cầu chính “Later, a separate automated CI review catches several”.",
          "<b>C. The extended session length caused the context window to fill with conversation history, leaving less room for thorough analysis</b>: Bash có thể thực hiện thao tác nhưng dễ vỡ và bỏ qua contract hoặc…",
          "<b>D. The CI review uses a more specific prompt tailored for catching bugs, while the developer's request was too general</b>: Bỏ qua yêu cầu chính “Later, a separate automated CI review catches several”."
        ]
      }
    },
    {
      "number": 152,
      "topic": 1,
      "type": "mcq",
      "question": "You've configured your Claude agent with three MCP servers: one for git operations, one for Jira ticket management, and one for documentation search. When a user asks the agent to \"create a branch for JIRA- 123 and add documentation links to the ticket,\" how does the agent access tools across these servers?",
      "options": [
        "The agent automatically selects the most relevant server based on the request and loads only that server's tools.",
        "You must specify which MCP server to use for each turn, and the agent can only access one server's tools at a time.",
        "Tools from all configured MCP servers are discovered at connection time and available simultaneously to the agent.",
        "The agent queries each server sequentially to determine which handles each tool, routing calls based on tool name prefixes."
      ],
      "answers": [
        "Tools from all configured MCP servers are discovered at connection time and available simultaneously to the agent."
      ],
      "explanation": {
        "key": "<b>“You've configured your Claude agent with three MCP servers: one for”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Tools from all configured MCP servers are discovered at connection time”</b> <i>(trong đáp án C)</i>: để Công cụ từ tất cả các MCP server được định cấu hình được phát hiện tại thời…",
        "elimination": [
          "<b>A. The agent automatically selects the most relevant server based on the request and loads only that server's tools.</b>: Bash có thể thực hiện thao tác nhưng dễ vỡ và bỏ qua contract hoặc…",
          "<b>B. You must specify which MCP server to use for each turn, and the agent can only access one server's tools at a time.</b>: Bỏ qua yêu cầu chính “You've configured your Claude agent with three MCP”.",
          "<b>D. The agent queries each server sequentially to determine which handles each tool, routing calls based on tool name prefixes.</b>: Bash có thể thực hiện thao tác nhưng dễ vỡ và bỏ qua contract hoặc…"
        ]
      }
    },
    {
      "number": 153,
      "topic": 1,
      "type": "mcq",
      "question": "An engineer submits two requests: • Request A: \"Rename the getUserData function to fetchUserProfile everywhere it's used.\" • Request B: \"Improve error handling throughout the data processing module—add try/catch blocks, meaningful error messages, and ensure failures don't silently corrupt data.\" For which request does specifying an explicit multi-phase workflow (such as analyze propose implement with review) most improve outcome quality?",
      "options": [
        "Neither request benefits significantly",
        "Request A, the function rename task",
        "Both requests benefit equally",
        "Request B, the error handling task"
      ],
      "answers": [
        "Request B, the error handling task"
      ],
      "explanation": {
        "key": "<b>“An engineer submits two requests: • Request A: \"Rename the getUserData”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Request B, the error handling task”</b> <i>(trong đáp án D)</i>: Yêu cầu B có kết thúc mở và mang nặng tính phán xét — \"cải thiện việc xử…",
        "elimination": [
          "<b>A. Neither request benefits significantly</b>: Bỏ qua yêu cầu chính “An engineer submits two requests: • Request A:”.",
          "<b>B. Request A, the function rename task</b>: Bỏ qua yêu cầu chính “An engineer submits two requests: • Request A:”.",
          "<b>C. Both requests benefit equally</b>: Bỏ qua yêu cầu chính “An engineer submits two requests: • Request A:”."
        ]
      }
    },
    {
      "number": 154,
      "topic": 1,
      "type": "mcq",
      "question": "During initial testing of the automated review pipeline, you notice that reviews on large PRs (50+ changed files) sometimes take over 20 minutes and cost $8-12 per run due to extensive agentic loops — Claude reads files, runs analysis tools, and iterates many times. Your team needs each invocation to abort once it reaches a fixed iteration count and a fixed dollar amount, enforced by Claude Code itself rather than the surrounding job runner. Which configuration change directly enforces both of those per-invocation caps?",
      "options": [
        "Add --max-turns 10 --max-budget-usd 2.00 to the claude -p invocation to cap iterations and spend.",
        "Set --permission-mode dontAsk to auto-deny any tool permission requests not in the explicitly allowed set.",
        "Switch the --model flag to a smaller, cheaper model so each iteration uses fewer tokens and lower per- call cost.",
        "Set timeout-minutes: 5 on the GitHub Actions job step and monitor per-run costs via the Anthropic Console usage dashboard."
      ],
      "answers": [
        "Add --max-turns 10 --max-budget-usd 2.00 to the claude -p invocation to cap iterations and spend."
      ],
      "explanation": {
        "key": "<b>“Your team needs each invocation to abort once it reaches a”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Add --max-turns 10 --max-budget-usd 2.00 to the claude -p invocation to”</b> <i>(trong đáp án A)</i>: Các điều khiển bắt buộc là các giới hạn riêng cho mỗi lần gọi bên trong chính Claude…",
        "elimination": [
          "<b>B. Set --permission-mode dontAsk to auto-deny any tool permission requests not in the explicitly allowed set.</b>: Bỏ qua yêu cầu chính “Your team needs each invocation to abort once”.",
          "<b>C. Switch the --model flag to a smaller, cheaper model so each iteration uses fewer tokens and lower per- call cost.</b>: Bỏ qua yêu cầu chính “Your team needs each invocation to abort once”.",
          "<b>D. Set timeout-minutes: 5 on the GitHub Actions job step and monitor per-run costs via the Anthropic Console usage dashboard.</b>: Bỏ qua yêu cầu chính “Your team needs each invocation to abort once”."
        ]
      }
    },
    {
      "number": 155,
      "topic": 1,
      "type": "mcq",
      "question": "Your update_user_profile tool accepts a user_id (required) and an optional fields_to_update object. In testing, Claude frequently omits user_id or passes incorrectly structured data. What is most critical for helping Claude understand what parameter values to provide?",
      "options": [
        "Verbose parameter names encoding format hints, such as user_id_string_uuid_format",
        "Clear parameter descriptions explaining expected format, such as \"user_id : UUID of the user to update (required)\"",
        "Detailed error responses explaining why invalid parameter values were rejected",
        "Strict JSON Schema type constraints marking user_id as required and defining fields_to_update as an object type"
      ],
      "answers": [
        "Clear parameter descriptions explaining expected format, such as \"user_id : UUID of the user to update (required)\""
      ],
      "explanation": {
        "key": "<b>“In testing, Claude frequently omits user_id or passes incorrectly structured data.”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Clear parameter descriptions explaining expected format, such as \"user_id : UUID”</b> <i>(trong đáp án B)</i>: Xóa mô tả tham số giải thích định dạng mong đợi, chẳng hạn như \"user_id: UUID của người…",
        "elimination": [
          "<b>A. Verbose parameter names encoding format hints, such as user_id_string_uuid_format</b>: Bỏ qua yêu cầu chính “In testing, Claude frequently omits user_id or passes”.",
          "<b>C. Detailed error responses explaining why invalid parameter values were rejected</b>: Bỏ qua yêu cầu chính “In testing, Claude frequently omits user_id or passes”.",
          "<b>D. Strict JSON Schema type constraints marking user_id as required and defining fields_to_update as an object type</b>: Bỏ qua yêu cầu chính “In testing, Claude frequently omits user_id or passes”."
        ]
      }
    },
    {
      "number": 156,
      "topic": 1,
      "type": "mcq",
      "question": "Your conversation history includes two types of content: persistent story elements (character backgrounds, plot structure, world rules) that must remain consistent throughout, and extensive brainstorming discussion that's mostly ephemeral. After 40+ turns, you're hitting context limits and users report the assistant \"forgets\" established character traits, breaking narrative consistency. Which approach best ensures persistent story elements remain available to the model while reclaiming context space?",
      "options": [
        "Separate persistent story elements into a retained \"story bible\" section at context start, applying trimming or summarization only to brainstorming discussion.",
        "Apply a sliding-window approach keeping only the most recent 25 turns, relying on the model to infer earlier context from recent discussion flow.",
        "Summarize the entire conversation history into a condensed synopsis every 20 turns, replacing the full history to free up tokens.",
        "Store all history in a vector database and retrieve semantically similar passages for each new message, replacing conversation history with retrieved chunks."
      ],
      "answers": [
        "Separate persistent story elements into a retained \"story bible\" section at context start, applying trimming or summarization only to brainstorming discussion."
      ],
      "explanation": {
        "key": "<b>“After 40+ turns, you're hitting context limits and users report the”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Separate persistent story elements into a retained \"story bible\" section at”</b> <i>(trong đáp án A)</i>: Tách các yếu tố câu chuyện dai dẳng thành một phần \"kinh thánh câu chuyện\" được giữ lại…",
        "elimination": [
          "<b>B. Apply a sliding-window approach keeping only the most recent 25 turns, relying on the model to infer earlier context from recent discussion flow.</b>: Bỏ qua yêu cầu chính “After 40+ turns, you're hitting context limits and”.",
          "<b>C. Summarize the entire conversation history into a condensed synopsis every 20 turns, replacing the full history to free up tokens.</b>: Bash có thể thực hiện thao tác nhưng dễ vỡ và bỏ qua contract hoặc…",
          "<b>D. Store all history in a vector database and retrieve semantically similar passages for each new message, replacing conversation history with retrieved chunks.</b>: Retrieval có thể hữu ích ở quy mô lớn nhưng bổ sung hạ tầng và…"
        ]
      }
    },
    {
      "number": 157,
      "topic": 1,
      "type": "mcq",
      "question": "Users frequently refine their search criteria mid-conversation. You notice a pattern: when users say things like \"Actually, let's raise the budget to $650K\" or \"I'd prefer a condo now instead of a house,\" the assistant sometimes continues referencing the original preferences in later responses—even though the updates are clearly present in the conversation history. Context usage is only at 35% capacity. Which solution most reliably ensures the model uses the current preferences?",
      "options": [
        "Implement conversation pruning to remove turns containing outdated preferences, ensuring only current ones remain in context.",
        "Add system prompt instructions emphasizing that the model should always prioritize the most recently stated preferences over earlier ones.",
        "Include few-shot examples showing the assistant correctly acknowledging and applying preference changes in responses.",
        "Maintain a structured state object with current preferences, update it on changes, and include it in each request."
      ],
      "answers": [
        "Maintain a structured state object with current preferences, update it on changes, and include it in each request."
      ],
      "explanation": {
        "key": "<b>“Context usage is only at 35% capacity.”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Maintain a structured state object with current preferences, update it on”</b> <i>(trong đáp án D)</i>: Duy trì một đối tượng trạng thái có cấu trúc với các tùy chọn hiện tại, cập nhật…",
        "elimination": [
          "<b>A. Implement conversation pruning to remove turns containing outdated preferences, ensuring only current ones remain in context.</b>: Bỏ qua yêu cầu chính “Context usage is only at 35% capacity”.",
          "<b>B. Add system prompt instructions emphasizing that the model should always prioritize the most recently stated preferences over earlier ones.</b>: Bỏ qua yêu cầu chính “Context usage is only at 35% capacity”.",
          "<b>C. Include few-shot examples showing the assistant correctly acknowledging and applying preference changes in responses.</b>: Bỏ qua yêu cầu chính “Context usage is only at 35% capacity”."
        ]
      }
    },
    {
      "number": 158,
      "topic": 1,
      "type": "mcq",
      "question": "After deploying automated code review, developers report that approximately 35% of flagged findings are false positives falling into consistent patterns: style suggestion contradicting team conventions, security warnings for patterns safe in your deployment context, and performance suggestions that would degrade your specific use case. You want to reduce false positives while maintaining the ability to catch genuine issues. Which approach best enables the model to generalize its judgment to novel code patterns it hasn't seen before?",
      "options": [
        "Create a comprehensive written specification of all patterns that should not be flagged, then include this full documentation in the system prompt.",
        "Implement post-processing that uses keyword matching to filter out findings containing terms like \"convention,\" \"context-dependent,\" or \"trade-off.\"",
        "Add instructions to your system prompt to \"be conservative,\" \"only flag definite issues,\" and \"consider that some patterns may be intentional.\"",
        "Include few-shot examples in your prompt showing annotated code snippets that distinguish acceptable patterns from genuine issues in each category."
      ],
      "answers": [
        "Include few-shot examples in your prompt showing annotated code snippets that distinguish acceptable patterns from genuine issues in each category."
      ],
      "explanation": {
        "key": "<b>“After deploying automated code review, developers report that approximately 35% of”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Include few-shot examples in your prompt showing annotated code snippets that”</b> <i>(trong đáp án D)</i>: Bao gồm một vài ví dụ ngắn gọn trong lời nhắc của bạn hiển thị các đoạn mã…",
        "elimination": [
          "<b>A. Create a comprehensive written specification of all patterns that should not be flagged, then include this full documentation in the system prompt.</b>: Bỏ qua yêu cầu chính “After deploying automated code review, developers report that”.",
          "<b>B. Implement post-processing that uses keyword matching to filter out findings containing terms like \"convention,\" \"context-dependent,\" or \"trade-off.\"</b>: Bỏ qua yêu cầu chính “After deploying automated code review, developers report that”.",
          "<b>C. Add instructions to your system prompt to \"be conservative,\" \"only flag definite issues,\" and \"consider that some patterns may be intentional.\"</b>: Bỏ qua yêu cầu chính “After deploying automated code review, developers report that”."
        ]
      }
    },
    {
      "number": 159,
      "topic": 1,
      "type": "mcq",
      "question": "You are setting up a non-interactive automated code review pipeline using Claude Code. You want Claude to analyze a pulled Git diff (git diff) against the main branch and apply a custom set of code review instructions. However, you notice that when you run the pipeline, Claude only looks at the raw diff text itself and completely stops using its file-reading or code navigation tools. As a result, it fails to inspect the broader codebase repository context, which is critical because the diff modifies a core function called by many other external modules. Which change to the CLI invocation will cause Claude to read related files in the repository while still successfully applying your custom review instructions?",
      "options": [
        "Replace --system-prompt with --append-system-prompt so your review instructions are added to Claude Code's default prompt instead of overwriting the built-in guidance for using file-reading and code navigation tools.",
        "Remove --system-prompt entirely and place the review instructions in a CLAUDE.md file at the repo root, since --system-prompt is incompatible with tool use under -p.",
        "Stop piping the diff via stdin and instead embed the diff contents inside the prompt string, so Claude Code treats the invocation as an agentic session rather than a stream-processing one.",
        "Keep --system-prompt and add --allowedTools \"Read, Glob, Grep\" so that the non-interactive mode permits file system tools that it otherwise disables."
      ],
      "answers": [
        "Replace --system-prompt with --append-system-prompt so your review instructions are added to Claude Code's default prompt instead of overwriting the built-in guidance for using file-reading and code navigation tools."
      ],
      "explanation": {
        "key": "<b>“As a result, it fails to inspect the broader codebase repository”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Replace --system-prompt with --append-system-prompt so your review instructions are added to”</b> <i>(trong đáp án A)</i>: Thay thế --system-prompt bằng --append-system-prompt để hướng dẫn xem xét của bạn được thêm vào lời nhắc mặc…",
        "elimination": [
          "<b>B. Remove --system-prompt entirely and place the review instructions in a CLAUDE.md file at the repo root, since --system-prompt is incompatible with tool use under -p.</b>: Bỏ qua yêu cầu chính “As a result, it fails to inspect the”.",
          "<b>C. Stop piping the diff via stdin and instead embed the diff contents inside the prompt string, so Claude Code treats the invocation as an agentic session rather than a stream-processing one.</b>: Bỏ qua yêu cầu chính “As a result, it fails to inspect the”.",
          "<b>D. Keep --system-prompt and add --allowedTools \"Read, Glob, Grep\" so that the non-interactive mode permits file system tools that it otherwise disables.</b>: Bỏ qua yêu cầu chính “As a result, it fails to inspect the”."
        ]
      }
    },
    {
      "number": 160,
      "topic": 1,
      "type": "mcq",
      "question": "Your development team is using Claude Code to automate test generation across a large codebase. However, developers are frequently rejecting the generated test suites because Claude creates a high volume of trivial assertions or tests that merely maximize line coverage without validating meaningful behavioral logic or edge cases. You want to guide Claude to generate high-quality, production-ready tests directly without introducing high latency or modifying the core pipeline script. Which strategy best ensures that high-quality, meaningful tests are generated in the first place?",
      "options": [
        "Document testing standards in CLAUDE.md including valuable test criteria, available fixtures with intended use cases, and examples distinguishing meaningful behavioral tests from trivial assertions.",
        "Implement a two-phase generation where a second Claude call scores each test against quality criteria, filtering out low-scoring tests before presenting results to developers.",
        "Add post-generation coverage analysis that automatically filters out any generated test that doesn't increase line coverage beyond what existing tests provide.",
        "Restrict test generation to directories where historical quality metrics show higher acceptance rates, disabling it for areas where generated tests consistently require heavy editing."
      ],
      "answers": [
        "Document testing standards in CLAUDE.md including valuable test criteria, available fixtures with intended use cases, and examples distinguishing meaningful behavioral tests from trivial assertions."
      ],
      "explanation": {
        "key": "<b>“You want to guide Claude to generate high-quality, production-ready tests directly”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Document testing standards in CLAUDE.md including valuable test criteria, available fixtures”</b> <i>(trong đáp án A)</i>: Ghi lại các tiêu chuẩn kiểm tra trong CLAUDE.md, bao gồm các tiêu chí kiểm tra có giá…",
        "elimination": [
          "<b>B. Implement a two-phase generation where a second Claude call scores each test against quality criteria, filtering out low-scoring tests before presenting results to developers.</b>: Bỏ qua yêu cầu chính “You want to guide Claude to generate high-quality,”.",
          "<b>C. Add post-generation coverage analysis that automatically filters out any generated test that doesn't increase line coverage beyond what existing tests provide.</b>: Bỏ qua yêu cầu chính “You want to guide Claude to generate high-quality,”.",
          "<b>D. Restrict test generation to directories where historical quality metrics show higher acceptance rates, disabling it for areas where generated tests consistently require heavy editing.</b>: Bỏ qua yêu cầu chính “You want to guide Claude to generate high-quality,”."
        ]
      }
    },
    {
      "number": 161,
      "topic": 1,
      "type": "mcq",
      "question": "Your music discovery assistant should consistently maintain an enthusiastic tone, explain its reasoning for each recommendation, and ask clarifying questions to better understand user preferences. You want this behavior to persist reliably across all user interactions. Where should you define these behavioral guidelines?",
      "options": [
        "In the first assistant message, instructing Claude to follow these guidelines going forward",
        "In environmental variables that your application passes to the API client",
        "Prepended to each user message before sending to the API",
        "In the system prompt"
      ],
      "answers": [
        "In the system prompt"
      ],
      "explanation": {
        "key": "<b>“You want this behavior to persist reliably across all user interactions.”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“In the system prompt”</b> <i>(trong đáp án D)</i>: Trong lời nhắc hệ thống.",
        "elimination": [
          "<b>A. In the first assistant message, instructing Claude to follow these guidelines going forward</b>: Bỏ qua yêu cầu chính “You want this behavior to persist reliably across”.",
          "<b>B. In environmental variables that your application passes to the API client</b>: Bỏ qua yêu cầu chính “You want this behavior to persist reliably across”.",
          "<b>C. Prepended to each user message before sending to the API</b>: Bỏ qua yêu cầu chính “You want this behavior to persist reliably across”."
        ]
      }
    },
    {
      "number": 162,
      "topic": 1,
      "type": "mcq",
      "question": "Your team is configuring MCP servers in Claude Code. You want to add a shared venue lookup server that all team members should have access to, and you personally want to add an experimental music playlist server that only you are testing. Which configuration approach correctly applies MCP server scopes?",
      "options": [
        "Add venue server to ~/.claude.json and playlist server to .mcp.json",
        "Add venue server to .mcp.json and playlist server to ~/.claude.json",
        "Add both servers to the project-level .mcp.json file",
        "Add both servers to your local ~/.claude.json"
      ],
      "answers": [
        "Add venue server to .mcp.json and playlist server to ~/.claude.json"
      ],
      "explanation": {
        "key": "<b>“You want to add a shared venue lookup server that all”</b> <i>(trong câu hỏi)</i>: Xác định yêu cầu chính của câu hỏi.<br><b>“Add venue server to .mcp.json and playlist server to ~/.claude.json”</b> <i>(trong đáp án B)</i>: Thêm máy chủ địa điểm vào .mcp.json và máy chủ danh sách phát vào ~/.claude.json.",
        "elimination": [
          "<b>A. Add venue server to ~/.claude.json and playlist server to .mcp.json</b>: Bỏ qua yêu cầu chính “You want to add a shared venue lookup”.",
          "<b>C. Add both servers to the project-level .mcp.json file</b>: Bỏ qua yêu cầu chính “You want to add a shared venue lookup”.",
          "<b>D. Add both servers to your local ~/.claude.json</b>: Bỏ qua yêu cầu chính “You want to add a shared venue lookup”."
        ]
      }
    }
  ]
};
