import { useCloudStorage, useActiveCell, useActiveViewId,useRecord, useFields, } from '@apitable/widget-sdk';
import React from 'react';

export const Information: React.FC = () => {
  const viewId = useActiveViewId();
  const fields = useFields(viewId);
  const activeCell = useActiveCell();
  const activeRecord = useRecord(activeCell?.recordId);
  const [text] = useCloudStorage('text', '');

  function getFieldIdByName(intext: string): string | null {
    const field = fields.find(field => field.name === intext);
    return field ? field.id : "";
  }


  function processUrlTemplate(url: string): string {
    const regex = /{([^}]+)}/g;
    let result = url;

    const matches = url.match(regex);
    if (matches) {
      for (const match of matches) {
        const intext = match.slice(1, -1); // 去除大括号
        const fieldId = getFieldIdByName(intext)
        const outtext = activeRecord?.getCellValue(typeof fieldId === "string" ? fieldId : ""); // 调用函数1获取 outtext
        result = result.replace(match, outtext); // 使用 outtext 替换掉大括号包裹的字符串
      }
    }

    return result;
  }

  const notice = <div style={{width:"100%", height: "100%", fontSize: "1.6em", color: "#696969",
      backgroundColor: "rgb(245, 245, 245)", alignContent: "center", justifyContent: "center", alignItems: "center",
      display: "flex"}}>请展开小程序配置网址模板</div>

  return (
    <div style={{width:"100%", height: "100%"}} >
        {
          text ?
          <iframe style={{width:"100%", height: "100%", border: 0}} id="myframe" src={processUrlTemplate(text)} name="myframe"/>
          : !text? notice : notice
        }
    </div>
  );
};
