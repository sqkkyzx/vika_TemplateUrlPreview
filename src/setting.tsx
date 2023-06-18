import React, { useState}  from 'react';
import { useCloudStorage, useSettingsButton } from '@apitable/widget-sdk';
import {TextInput, Button, Typography, colors} from "@apitable/components";
import { FieldPicker, useActiveViewId } from '@apitable/widget-sdk';

export const Setting: React.FC = () => {
  const [isShowingSettings] = useSettingsButton();
  const [text, setText] = useCloudStorage('text', '');
  const [inputValue, setInputValue] = useState(text.toString());
  const [selectedField, setSelectedField] = useState('');
  const [insertValue, setInsertValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFieldChange = (option) => {
    setSelectedField(option.value);
    setInsertValue(option.label)
  };

  const handleInsertClick = () => {
    if (selectedField) {
      setInputValue(inputValue + `{${insertValue}}`);
    }
  };

  const handleButtonClick = () => {
    setText(inputValue);
  };

  const viewId = useActiveViewId();

  return isShowingSettings ? (
    <div style={{ flexShrink: 0, width: '500px', borderLeft: 'solid 1px gainsboro', padding: '10px 25px' }}>
      <Typography variant="h3" color={colors.textBrandDefault} style={{padding: "20px 0"}}>网址模板设置</Typography>
        <Typography variant="h6" color={colors.textBrandDefault} style={{padding: "20px 0"}}>· 网址输入：</Typography>
      <TextInput block placeholder="在此输入你的模板网址，构造要预览的URL" value={inputValue} onChange={handleInputChange} />
      <Typography variant="h6" color={colors.textBrandDefault} style={{padding: "20px 0"}}>
          · 字段选择辅助工具：
      </Typography>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ flex: 1 }}><FieldPicker viewId={viewId} fieldId={selectedField} onChange={handleFieldChange} /></div>
            <Button color="primary" onClick={handleInsertClick}>插入</Button>
        </div>
        <div style={{padding: "40px 0"}}>
            <Button color="primary" onClick={handleButtonClick}>保存设置</Button>
        </div>

        <div>
            <Typography variant="h6" style={{padding: "20px 0"}}>· 用法与帮助：</Typography>
            <Typography variant="h7">1. 可直接输入固定地址，例如:</Typography>
            <br/>
            <TextInput size="small" block disabled placeholder="https://vika.cn"/>
            <br/>
            <Typography variant="h7">2. 可直接输入某个字段，则预览当前选中行的字段的值。例如：</Typography>
            <br/>
            <TextInput size="small" block disabled placeholder="{网址}"/>
            <br/>
            <Typography variant="h7">3. 可使用字段值配置网址模板，将从选中行的指定字段取值渲染进网址并预览。例如，填写的模板 和 选中行的记录 分别为：</Typography><br/>
            <TextInput size="small" block disabled placeholder="https://vika.cn/workbench/&#123;字段A&#125;/&#123;字段B&#125;/"/><br/>
            <table >
                    <thead>
                        <tr style={{border: "1px solid darkgray"}}>
                            <th style={{border: "1px solid darkgray", padding: "0 50px"}}>字段A</th>
                            <th style={{border: "1px solid darkgray", padding: "0 50px"}}>字段B</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{border: "1px solid darkgray"}}>
                            <td style={{border: "1px solid darkgray", padding: "0 50px"}}>dst9876543</td>
                            <td style={{border: "1px solid darkgray", padding: "0 50px"}}>viw0123456</td>
                        </tr>
                    </tbody>
                </table><br/>
            <Typography variant="h7">则预览的网址为：</Typography><br/>
            <TextInput size="small" block disabled placeholder="https://vika.cn/workbench/dst9876543/viw0123456/"/><br/>
        </div>

    </div>
  ) : null;
};



