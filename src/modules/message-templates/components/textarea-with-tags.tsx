import { DragEvent, useEffect, useRef } from 'react';
import { MessageTags, MessageTagsColors, MessageTemplate } from '../models';

type props = {
  content: string;
  onChangeProperty?: (propName: keyof MessageTemplate, value: any) => void;
}

export function TextareaWithTags({ content, onChangeProperty = () => {} }: props) {
  const editableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatedContent = content.replace(/{{(.*?)}}/g, 
      (match, tag: keyof typeof MessageTags) => {
        if (tag in MessageTags) return tagElement(MessageTags[tag], MessageTagsColors[tag] ); 

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

  const tagElement = (text: string, color: string) => {
    return `<span contenteditable="false" class="rounded-md px-3 py-0 bg-${color}-100 text-${color}-700 w-fit font-bold">${text}</span>`;
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
  
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {  e.preventDefault();
    e.preventDefault();

    const variable = e.dataTransfer.getData('text/plain') as keyof typeof MessageTags;

    const tagHTML = tagElement(MessageTags[variable], MessageTagsColors[variable]);

    if (editableRef.current) {
      editableRef.current.focus();

      let range: Range | null = null;

      // Modern browsers (Firefox, some Chrome)
      const pos = (document as any).caretPositionFromPoint?.(e.clientX, e.clientY);
      if (pos) {
        range = document.createRange();
        range.setStart(pos.offsetNode, pos.offset);
        range.setEnd(pos.offsetNode, pos.offset);
      }
  
      // Deprecated but still works in Chrome
      if (!range && document.caretRangeFromPoint) {
        range = document.caretRangeFromPoint(e.clientX, e.clientY);
      }
  
      // Fallback: place at the end
      if (!range) {
        range = document.createRange();
        range.selectNodeContents(editableRef.current);
        range.collapse(false); // end of content
      }
  
      if (range) {
        const temp = document.createElement('div');
        temp.innerHTML = tagHTML;
        const tagNode = temp.firstChild;
  
        if (tagNode) {
          range.deleteContents();
          range.insertNode(tagNode);
          range.setStartAfter(tagNode);
          range.setEndAfter(tagNode);
  
          const sel = window.getSelection();
          sel?.removeAllRanges();
          sel?.addRange(range);
        }
      }

      handleInput(); // call to update the underlying content state
    }
  };

  return (
    <div 
      ref={editableRef}
      contentEditable
      className="outline-none w-full whitespace-pre-wrap"
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      onDrop={handleDrop}
    />
  );
}