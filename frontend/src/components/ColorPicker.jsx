import React, { useState } from 'react'
import {
    List,
    ListInput,
    Page
  } from 'framework7-react';

const ColorPicker = () => {
  const [wheePickerValue, setWheePickerValue] = useState({ hex: '#00ff00' });

  return (
    <Page>
    <List>
        <ListInput
          type="colorpicker"
          placeholder="Color"
          readonly
          value={wheePickerValue}
          onColorPickerChange={(value) => setWheePickerValue(value)}
          colorPickerParams={{
            targetEl: '.wheel-picker-target',
          }}
        >
          <i
            slot="media"
            style={{ backgroundColor: `${wheePickerValue.hex}` }}
            className="icon demo-list-icon wheel-picker-target"
          />
        </ListInput>
      </List>
      </Page>
  )
}

export default ColorPicker
