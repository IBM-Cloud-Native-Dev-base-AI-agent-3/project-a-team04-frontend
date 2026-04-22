import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Extension } from '@tiptap/core';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import FontFamily from '@tiptap/extension-font-family';
import {
  Bold,
  Italic,
  Strikethrough,
  Underline as UnderlineIcon,
  Link2,
  Link2Off,
  Highlighter,
  Minus,
  ImagePlus,
} from 'lucide-react';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/layout/Footer';
import BackButton from '@/components/shared/BackButton';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { APP_STYLES, APP_THEME } from '@/constants/theme';

interface FreeBoardCreatePageProps {
  isLoggedIn: boolean;
  onLogout?: () => void;
}

const FontSize = Extension.create({
  name: 'fontSize',

  addOptions() {
    return {
      types: ['textStyle'],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => (element as HTMLElement).style.fontSize || null,
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }

              return { style: `font-size: ${attributes.fontSize}` };
            },
          },
        },
      },
    ];
  },
});

export default function FreeBoardCreatePage({ isLoggedIn, onLogout }: FreeBoardCreatePageProps) {
  const navigate = useNavigate();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState('');
  const [toolbarTick, setToolbarTick] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState('#ffff00');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
        blockquote: false,
      }),
      TextStyle,
      FontFamily,
      Color,
      FontSize,
      Underline,
      Highlight.configure({
        multicolor: true,
      }),
      Image,
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),
      Placeholder.configure({
        placeholder: '글의 내용을 입력해 주세요.',
      }),
    ],
    content: '<p></p>',
    editorProps: {
      attributes: {
        class:
          'min-h-[18rem] rounded-b-lg border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none focus:border-blue-500 prose max-w-none',
      },
    },
    onSelectionUpdate: () => setToolbarTick((value) => value + 1),
    onTransaction: () => setToolbarTick((value) => value + 1),
  });

  const currentFontFamily = editor?.getAttributes('textStyle').fontFamily ?? 'inherit';
  const currentFontSize = editor?.getAttributes('textStyle').fontSize ?? 'inherit';
  const currentTextColor = editor?.getAttributes('textStyle').color ?? '#1f2937';

  const editorActions = [
    {
      label: '굵게',
      icon: Bold,
      active: editor?.isActive('bold') ?? false,
      onMouseDown: () => editor?.chain().focus().toggleBold().run(),
    },
    {
      label: '기울임',
      icon: Italic,
      active: editor?.isActive('italic') ?? false,
      onMouseDown: () => editor?.chain().focus().toggleItalic().run(),
    },
    {
      label: '취소선',
      icon: Strikethrough,
      active: editor?.isActive('strike') ?? false,
      onMouseDown: () => editor?.chain().focus().toggleStrike().run(),
    },
    {
      label: '밑줄',
      icon: UnderlineIcon,
      active: editor?.isActive('underline') ?? false,
      onMouseDown: () => editor?.chain().focus().toggleUnderline().run(),
    },
    {
      label: '링크',
      icon: Link2,
      active: editor?.isActive('link') ?? false,
      onMouseDown: () => {
        if (!editor) {
          return;
        }

        const previousUrl = editor.getAttributes('link').href ?? '';
        const url = window.prompt('링크 주소를 입력하세요.', previousUrl);

        if (url === null) {
          return;
        }

        if (url === '') {
          editor.chain().focus().unsetLink().run();
          return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
      },
    },
    {
      label: '링크 해제',
      icon: Link2Off,
      active: false,
      onMouseDown: () => editor?.chain().focus().unsetLink().run(),
    },
    {
      label: '구분선',
      icon: Minus,
      active: false,
      onMouseDown: () => editor?.chain().focus().setHorizontalRule().run(),
    },
    {
      label: '이미지',
      icon: ImagePlus,
      active: false,
      onMouseDown: () => {
        imageInputRef.current?.click();
      },
    },
  ];

  const handleImageFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      editor.chain().focus().setImage({ src: dataUrl }).run();
    };
    reader.readAsDataURL(file);

    // Reset input value so the same file can be selected again
    e.target.value = '';
  };

  const handleSubmit = () => {
    const htmlContent = editor?.getHTML() ?? '';
    void htmlContent;
    navigate('/free-board');
  };

  return (
    <div className={APP_THEME.classes.pageShellMuted}>
      <SiteHeader isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <main className="container mx-auto px-4 pt-44 pb-20">
        <div className="max-w-4xl mx-auto">
          <BackButton onClick={() => navigate('/free-board')} />

          <h1 className="text-3xl font-black text-slate-900 mb-2">글쓰기</h1>
          <p className="text-slate-500 mb-8">자유게시판에 새로운 글을 작성해주세요.</p>

          <Card className="border border-slate-200 shadow-sm">
            <CardContent className="p-8">
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageFileSelect}
                className="hidden"
              />
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">제목 *</label>
                  <Input placeholder="글의 제목을 입력해 주세요." value={title} onChange={(event) => setTitle(event.target.value)} />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">내용 *</label>
                  <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
                    <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 bg-slate-50 p-2">
                      <select
                        value={currentFontFamily}
                        onChange={(event) => {
                          const value = event.target.value;
                          if (!editor) {
                            return;
                          }

                          if (value === 'inherit') {
                            editor.chain().focus().unsetFontFamily().run();
                            return;
                          }

                          editor.chain().focus().setFontFamily(value).run();
                        }}
                        className="h-9 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-sm outline-none hover:border-slate-300 focus:border-blue-500"
                      >
                        <option value="inherit">기본 폰트</option>
                        <option value="Arial">Arial</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Verdana">Verdana</option>
                      </select>

                      <select
                        value={currentFontSize}
                        onChange={(event) => {
                          const value = event.target.value;
                          if (!editor) {
                            return;
                          }

                          if (value === 'inherit') {
                            editor.chain().focus().setMark('textStyle', { fontSize: null }).run();
                            return;
                          }

                          editor.chain().focus().setMark('textStyle', { fontSize: value }).run();
                        }}
                        className="h-9 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-sm outline-none hover:border-slate-300 focus:border-blue-500"
                      >
                        <option value="inherit">글자 크기</option>
                        <option value="12px">12px</option>
                        <option value="14px">14px</option>
                        <option value="16px">16px</option>
                        <option value="18px">18px</option>
                        <option value="24px">24px</option>
                        <option value="32px">32px</option>
                      </select>

                      <label className="inline-flex h-9 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-sm hover:border-slate-300">
                        <span>글자색</span>
                        <input
                          type="color"
                          value={currentTextColor}
                          onChange={(event) => {
                            if (!editor) {
                              return;
                            }

                            editor.chain().focus().setColor(event.target.value).run();
                          }}
                          className="h-6 w-6 cursor-pointer border-0 bg-transparent p-0"
                          aria-label="글자색 선택"
                        />
                      </label>

                      <label className="inline-flex h-9 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-sm hover:border-slate-300">
                        <span>배경색</span>
                        <input
                          type="color"
                          value={backgroundColor}
                          onChange={(event) => {
                            const color = event.target.value;
                            setBackgroundColor(color);
                            if (!editor) {
                              return;
                            }

                            editor.chain().focus().toggleHighlight({ color }).run();
                          }}
                          className="h-6 w-6 cursor-pointer border-0 bg-transparent p-0"
                          aria-label="배경색 선택"
                        />
                      </label>

                      {editorActions.map((action) => {
                        const Icon = action.icon;

                        return (
                          <button
                            key={action.label}
                            type="button"
                            onMouseDown={(event) => {
                              event.preventDefault();
                              if (action.onMouseDown) {
                                action.onMouseDown();
                              }
                              setToolbarTick((value) => value + 1);
                            }}
                            disabled={!editor}
                            className={`inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-sm font-medium transition-all duration-150 transform-gpu border ${action.active ? 'border-blue-200 bg-blue-50 text-blue-700 shadow-[0_1px_0_rgba(59,130,246,0.12)]' : 'border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm active:translate-y-0 active:shadow-inner'} disabled:cursor-not-allowed disabled:opacity-50`}
                            aria-label={action.label}
                            title={action.label}
                            aria-pressed={action.active}
                          >
                            <Icon size={16} />
                            <span className="hidden sm:inline">{action.label}</span>
                          </button>
                        );
                      })}
                    </div>
                    <EditorContent editor={editor} />
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    className="w-full h-11 text-white font-bold"
                    style={APP_STYLES.primaryButton}
                    onClick={handleSubmit}
                  >
                    작성하기
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
