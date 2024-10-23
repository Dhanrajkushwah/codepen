import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-codepen',
  templateUrl: './codepen.component.html',
  styleUrls: ['./codepen.component.css']
})
export class CodepenComponent {
  htmlCode: string = '';
  cssCode: string = '';
  jsCode: string = '';
  isDarkTheme: boolean = false;
  isHtmlEditorVisible: boolean = true;
  isCssEditorVisible: boolean = true;
  isJsEditorVisible: boolean = true;

  @ViewChild('iframe', { static: false })
  iframe!: ElementRef;

  constructor(private renderer: Renderer2) {}

  onInputChange(textarea: HTMLTextAreaElement, lineNumbersElement: HTMLElement) {
    this.updateLineNumbers(textarea, lineNumbersElement);
    this.updatePreview();
  }

  updateLineNumbers(textarea: HTMLTextAreaElement, lineNumbersElement: HTMLElement) {
    const lines = textarea.value.split('\n').length;
    lineNumbersElement.innerHTML = Array.from({ length: lines }, (_, i) => `<div>${i + 1}</div>`).join('');
  }

  updatePreview() {
    const iframeDoc = this.iframe.nativeElement.contentDocument;
    const htmlContent = `
      <style>${this.cssCode}</style>
      ${this.htmlCode}
      <script>${this.jsCode}</script>
    `;
    iframeDoc.open();
    iframeDoc.write(htmlContent);
    iframeDoc.close();
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    const body = document.querySelector('body');
    this.renderer.setStyle(body, 'background-color', this.isDarkTheme ? '#333' : 'white');
    this.renderer.setStyle(body, 'color', this.isDarkTheme ? 'white' : 'black');
  }

  toggleHtmlEditor() {
    this.isHtmlEditorVisible = !this.isHtmlEditorVisible;
  }

  toggleCssEditor() {
    this.isCssEditorVisible = !this.isCssEditorVisible;
  }

  toggleJsEditor() {
    this.isJsEditorVisible = !this.isJsEditorVisible;
  }
}