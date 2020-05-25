/**

Copyright 2019 Forestry.io Inc

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

import * as React from 'react'
import { useState } from 'react'

import { ImageProps, Plugin } from '../../types'
import { MarkdownEditor } from '../MarkdownEditor'
import { Wysiwyg as WysiwygEditor } from '../WysiwygEditor'
import { EditorModeMenu } from '../EditorModeMenu'

export interface RawModeEditorProps {
  defaultValue: string
  imageProps?: ImageProps
  onChange: (value: string) => void
  plugins?: Plugin[]
  sticky?: boolean
}

const wysiwygModeTogglePlugin = (setMode: (mode: string) => void) => ({
  name: 'wysiwygModeToggle',
  WysiwygMenu: () => <EditorModeMenu toggleEditorMode={() => setMode('raw')} />,
})

export const RawModeEditor = ({
  defaultValue,
  imageProps,
  onChange,
  plugins = [],
  sticky,
}: RawModeEditorProps) => {
  const [mode, setMode] = useState('wysiwyg')
  const [value, setValue] = useState(defaultValue)

  const handleChange = (value: string) => {
    setValue(value)
    onChange(value)
  }

  return (
    <>
      {mode === 'raw' ? (
        <MarkdownEditor
          value={value}
          onChange={handleChange}
          imageProps={imageProps}
          toggleEditorMode={() => setMode('wysiwyg')}
        />
      ) : (
        <WysiwygEditor
          input={{
            value,
            onChange: handleChange,
          }}
          plugins={[...plugins, wysiwygModeTogglePlugin(setMode)]}
          sticky={sticky}
          format="markdown"
          imageProps={imageProps}
        />
      )}
    </>
  )
}
