'use client';

import { useEffect, useRef } from 'react';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mermaid 다이어그램 렌더링
    const renderMermaid = async () => {
      if (typeof window !== 'undefined') {
        try {
          const mermaid = (await import('mermaid')).default;
          mermaid.initialize({
            startOnLoad: true,
            theme: 'default',
            securityLevel: 'loose',
            fontFamily: 'ui-sans-serif, system-ui, sans-serif',
            themeVariables: {
              primaryColor: '#3b82f6',
              primaryTextColor: '#fff',
              primaryBorderColor: '#2563eb',
              lineColor: '#64748b',
              secondaryColor: '#10b981',
              tertiaryColor: '#f59e0b',
              background: '#ffffff',
              mainBkg: '#3b82f6',
              secondBkg: '#10b981',
              tertiaryBkg: '#f59e0b',
            },
          });
          
          if (containerRef.current) {
            const mermaidDivs = containerRef.current.querySelectorAll('.language-mermaid');
            mermaidDivs.forEach((div, index) => {
              const code = div.textContent || '';
              const id = `mermaid-diagram-${Date.now()}-${index}`;
              const wrapper = document.createElement('div');
              wrapper.className = 'mermaid-wrapper';
              wrapper.innerHTML = `<div id="${id}" class="mermaid">${code}</div>`;
              div.parentNode?.replaceChild(wrapper, div);
            });
            
            await mermaid.run({
              querySelector: '.mermaid',
            });
          }
        } catch (error) {
          console.error('Mermaid 렌더링 에러:', error);
          // Mermaid가 없어도 계속 진행
        }
      }
    };

    renderMermaid();
  }, [content]);

  // 간단한 마크다운 파싱 (react-markdown 없이)
  const parseMarkdown = (md: string) => {
    let html = md;
    
    // 코드 블록 보호 (mermaid 먼저 처리)
    const codeBlocks: any[] = [];
    
    // Mermaid 블록 먼저 처리
    html = html.replace(/```mermaid\n([\s\S]*?)```/g, (match, code) => {
      const placeholder = `___CODE_BLOCK_${codeBlocks.length}___`;
      codeBlocks.push({ lang: 'mermaid', code: code.trim(), match });
      return placeholder;
    });
    
    // 일반 코드 블록
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
      const placeholder = `___CODE_BLOCK_${codeBlocks.length}___`;
      codeBlocks.push({ lang: lang || 'text', code: code.trim(), match });
      return placeholder;
    });

    // 헤더
    html = html.replace(/^#### (.*$)/gim, '<h4 class="text-xl font-bold text-gray-800 mt-6 mb-3">$1</h4>');
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-3xl font-bold text-gray-900 mt-10 mb-6 border-b-2 border-gray-200 pb-2">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold text-gray-900 mt-12 mb-8 border-b-4 border-blue-500 pb-3">$1</h1>');

    // 리스트
    html = html.replace(/^\* (.*$)/gim, '<li class="ml-6 mb-2 leading-relaxed">• $1</li>');
    html = html.replace(/^- (.*$)/gim, '<li class="ml-6 mb-2 leading-relaxed">• $1</li>');
    html = html.replace(/^\d+\. (.*$)/gim, '<li class="ml-6 mb-2 list-decimal leading-relaxed">$1</li>');

    // 볼드, 이탤릭
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em class="italic text-gray-700">$1</em>');

    // 링크
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 underline font-medium" target="_blank" rel="noopener noreferrer">$1</a>');

    // 인라인 코드
    html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 text-red-600 px-2 py-0.5 rounded text-sm font-mono border border-gray-200">$1</code>');

    // 수평선
    html = html.replace(/^---$/gim, '<hr class="my-8 border-t-2 border-gray-300" />');
    
    // 인용구
    html = html.replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-blue-500 pl-4 italic text-gray-700 my-4 bg-blue-50 py-2">$1</blockquote>');

    // 테이블 처리 개선
    const tableLines: string[] = [];
    let inTable = false;
    
    html.split('\n').forEach((line) => {
      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        if (!inTable) {
          tableLines.push('<div class="overflow-x-auto my-6 rounded-lg border border-gray-200 shadow-sm" style="max-width: 100%;"><table class="min-w-full border-collapse">');
          inTable = true;
        }
        
        const cells = line.split('|').filter(cell => cell.trim());
        const isHeaderSeparator = line.includes('---');
        
        if (isHeaderSeparator) {
          tableLines.push('</thead><tbody>');
        } else if (inTable && tableLines[tableLines.length - 1].includes('<table')) {
          tableLines.push('<thead class="bg-gradient-to-r from-blue-50 to-indigo-50">');
          tableLines.push('<tr>');
          cells.forEach(cell => {
            tableLines.push(`<th class="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900 whitespace-nowrap">${cell.trim()}</th>`);
          });
          tableLines.push('</tr>');
        } else if (!isHeaderSeparator) {
          tableLines.push('<tr class="hover:bg-blue-50 transition-colors bg-white">');
          cells.forEach(cell => {
            tableLines.push(`<td class="border border-gray-300 px-4 py-3 text-gray-700">${cell.trim()}</td>`);
          });
          tableLines.push('</tr>');
        }
      } else if (inTable) {
        tableLines.push('</tbody></table></div>');
        tableLines.push(line);
        inTable = false;
      } else {
        tableLines.push(line);
      }
    });
    
    if (inTable) {
      tableLines.push('</tbody></table></div>');
    }
    
    html = tableLines.join('\n');

    // 코드 블록 복원
    codeBlocks.forEach((block, index) => {
      const placeholder = `___CODE_BLOCK_${index}___`;
      const lang = block.lang || 'text';
      
      if (lang === 'mermaid') {
        // Mermaid 블록
        html = html.replace(
          placeholder,
          `<div class="language-mermaid my-8 p-6 bg-white rounded-lg border-2 border-gray-200 shadow-md overflow-x-auto max-w-full">${block.code}</div>`
        );
      } else {
        // 일반 코드 블록 - 구문 강조 색상 적용
        const code = block.code
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          // Python 키워드 강조
          .replace(/\b(from|import|def|class|if|else|elif|for|while|return|try|except|with|as|in|is|not|and|or|True|False|None)\b/g, '<span class="text-purple-400 font-semibold">$1</span>')
          // 문자열 강조
          .replace(/(["'])(.*?)\1/g, '<span class="text-green-400">$1$2$1</span>')
          // 주석 강조
          .replace(/(#.*$)/gm, '<span class="text-gray-400 italic">$1</span>')
          // 함수명 강조
          .replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, '<span class="text-yellow-300">$1</span>(')
          // 숫자 강조
          .replace(/\b(\d+\.?\d*)\b/g, '<span class="text-blue-400">$1</span>');
        
        html = html.replace(
          placeholder,
          `<div class="my-6 rounded-lg overflow-hidden shadow-lg max-w-full">
            <div class="bg-gray-700 text-gray-100 px-4 py-2 text-sm font-mono font-semibold flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-red-500"></span>
              <span class="w-3 h-3 rounded-full bg-yellow-500"></span>
              <span class="w-3 h-3 rounded-full bg-green-500"></span>
              <span class="ml-2 text-white">${lang}</span>
            </div>
            <pre class="bg-gray-900 text-gray-100 p-4 overflow-x-auto max-w-full" style="max-height: 600px; overflow-y: auto;"><code class="language-${lang} text-sm leading-relaxed text-white block whitespace-pre">${code}</code></pre>
          </div>`
        );
      }
    });

    // 단락
    html = html.replace(/\n\n/g, '</p><p class="mb-4 leading-relaxed text-gray-700">');
    html = '<p class="mb-4 leading-relaxed text-gray-700">' + html + '</p>';

    return html;
  };

  const htmlContent = parseMarkdown(content);

  return (
    <div
      ref={containerRef}
      className="markdown-content prose prose-lg max-w-none overflow-hidden
        prose-headings:text-gray-900 prose-headings:font-bold
        prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8
        prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-6
        prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-4
        prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
        prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800
        prose-strong:text-gray-900 prose-strong:font-bold
        prose-code:text-red-600 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
        prose-pre:bg-gray-900 prose-pre:text-white prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
        prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-700
        prose-ul:my-4 prose-ul:ml-6
        prose-ol:my-4 prose-ol:ml-6
        prose-li:mb-2 prose-li:leading-relaxed
        prose-hr:my-8 prose-hr:border-gray-300
        prose-img:rounded-lg prose-img:shadow-md prose-img:my-6 prose-img:max-w-full
      "
      style={{ wordBreak: 'break-word' }}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

// Mermaid 및 코드 블록 스타일 추가
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    .mermaid-wrapper {
      margin: 2rem 0;
      padding: 1.5rem;
      background: white;
      border-radius: 0.5rem;
      border: 2px solid #e5e7eb;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow-x: auto;
      max-width: 100%;
    }
    
    .mermaid {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100px;
    }
    
    .mermaid svg {
      max-width: 100%;
      height: auto;
    }
    
    /* 코드 블록 추가 스타일 */
    .markdown-content pre {
      background-color: #1a1a1a !important;
      color: #ffffff !important;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      line-height: 1.7;
      overflow-x: auto;
      max-width: 100%;
    }
    
    .markdown-content pre code {
      color: #ffffff !important;
      background-color: transparent !important;
      font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
    }
    
    /* 표 반응형 스타일 */
    .markdown-content table {
      display: block;
      overflow-x: auto;
      white-space: nowrap;
      max-width: 100%;
    }
    
    /* 가로 스크롤바 스타일 개선 */
    .markdown-content pre::-webkit-scrollbar,
    .markdown-content .overflow-x-auto::-webkit-scrollbar {
      height: 8px;
    }
    
    .markdown-content pre::-webkit-scrollbar-track,
    .markdown-content .overflow-x-auto::-webkit-scrollbar-track {
      background: #374151;
      border-radius: 4px;
    }
    
    .markdown-content pre::-webkit-scrollbar-thumb,
    .markdown-content .overflow-x-auto::-webkit-scrollbar-thumb {
      background: #6b7280;
      border-radius: 4px;
    }
    
    .markdown-content pre::-webkit-scrollbar-thumb:hover,
    .markdown-content .overflow-x-auto::-webkit-scrollbar-thumb:hover {
      background: #9ca3af;
    }
  `;
  
  // 기존 스타일 태그가 있으면 제거
  const existingStyle = document.getElementById('markdown-custom-styles');
  if (existingStyle) {
    existingStyle.remove();
  }
  
  style.id = 'markdown-custom-styles';
  document.head.appendChild(style);
}

