import { useEffect, useRef } from 'react';
import { MessageTags, MessageTemplate } from '../models';

type props = {
  content: string;
  onChangeProperty?: (propName: keyof MessageTemplate, value: any) => void;
}

export function TextareaWithTags({ content, onChangeProperty = () => {} }: props) {
  const editableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatedContent = content.replace(/{{(.*?)}}/g, 
      (match, tag) => {
        if (tag in MessageTags) return tagElement(MessageTags[tag as keyof typeof MessageTags]); 

        return match;
      }
    );

    if (editableRef.current && editableRef.current.innerHTML !== updatedContent) {
      const sel = window.getSelection();
      const range = document.createRange();
      const currentFocusNode = sel?.focusNode;
      const currentFocusOffset = sel?.focusOffset;

      editableRef.current.innerHTML = updatedContent;

      if (currentFocusNode && currentFocusOffset !== undefined) {
        range.setStart(currentFocusNode, currentFocusOffset);
        range.collapse(true);
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    }
  }, [content]);

  const tagElement = (text: string) => {
    return `<span contenteditable="false" class="rounded-md px-3 py-0 bg-blue-200 text-blue-700 w-fit font-bold">${text}</span>`;
  };

  const handleInput = () => {
    if (!editableRef.current) return;

    let updatedContent = editableRef.current.innerHTML.replace(/<span[^>]*>(.*?)<\/span>/g, (match, text) => {
      const found = Object.entries(MessageTags).find(([, value]) => value === text);

      if(found) {
        const [ key, ] = found;
        return `{{${key}}}`;
      } 

      return match;
    });

    updatedContent = updatedContent
      // cleanup opening tags, ignores <br>
      .replace(/<(?!br\b)(\w+)[^>]*>/gm, '')

      // cleanup all html tags but <br>
      .replace(/<(?!br\b)\w+[^>]*\/>/gm, '')

      // cleanup <br> with any properties that it carries, in case it is a copy and paste from somewhere else
      .replace(/<br[^>]*>/gi, '<br>');

    onChangeProperty('content', updatedContent);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
  
      const selection = window.getSelection();
      if (!selection || !selection.getRangeAt || !selection.rangeCount) return;
  
      const range = selection.getRangeAt(0);
      const br = document.createElement('br');
      range.deleteContents();
      range.insertNode(br);
  
      // Move cursor after the <br>
      range.setStartAfter(br);
      range.setEndAfter(br);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  return (
    <div 
      ref={editableRef}
      contentEditable
      className="outline-none w-full whitespace-pre-wrap max-w-[550px]"
      onInput={handleInput}
      onKeyDown={handleKeyDown}
    />
  );
}