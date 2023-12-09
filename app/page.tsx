"use client";
import { useState, useEffect, useRef } from "react";
import "../style/index.css";

import { randomEmailName, emilList } from "@/apis";

export default function Home() {
  const [emailName, setEmailName] = useState("");
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [mailList, setMailList] = useState<any>([]);
  const [repeatCount, setRepeatCount] = useState<any>(0)

  const svgAnimateRef = useRef(null)

  const randomEmail_GEN = async () => {
    const res = await randomEmailName();

    if (res && res.code === 0) {
      const {
        data: { mailName },
      } = res;

      const emailAddress = mailName + "@wangtz.cn";
      setEmailName(emailAddress);
    }
  };

  function copyText(text: string) {
    //生成一个textarea对象
    var textArea = document.createElement("textarea");
    //设置属性
    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.width = "2em";
    textArea.style.height = "2em";
    textArea.style.padding = "0";
    textArea.style.border = "none";
    textArea.style.outline = "none";
    textArea.style.boxShadow = "none";
    textArea.style.background = "transparent";
    textArea.value = text;
    //添加到页面body
    document.body.appendChild(textArea);
    textArea.select();
    //执行
    var msg = document.execCommand("copy") ? "成功" : "失败";
    //移除对象
    document.body.removeChild(textArea);
  }

  async function handleCopyText(text: string) {
    setShowToast(true);
    copyText(text);
    if (showToast) return;
    const t: any = setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }

  function handleRefreshEmail() {
    if (!refreshFlag) {
      setRefreshFlag(true);
      randomEmail_GEN();
      let t = setTimeout(() => {
        setRefreshFlag(false);
        clearTimeout(t);
      }, 1000);
    }
  }

  async function getEmailList(name: string) {
    const data = await emilList(name);
    setMailList(data);
  }

  useEffect(() => {
    if (svgAnimateRef && svgAnimateRef.current) {
      // @ts-ignore
      svgAnimateRef.current.onrepeat = () => {
        setRepeatCount(new Date().getTime())
      }
    }
    randomEmail_GEN()
    getEmailList(emailName);
  }, []);

  useEffect(() => {
    if (repeatCount != 0) {
      getEmailList(emailName);
    }
  }, [repeatCount])

  return (
    <main className="w-full h-full bg-[var(--bg)] overflow-hidden flex flex-col">
      <h1 className="z-[2] h-[48px] w-full bg-gradient-to-b text-[30px] from-[#e4e0ba] to-[#f7d9aa] flex items-center flex-start px-[16px]">
        📩
        <span className="ml-[12px] text-[18px] font-bold">Temp Mail</span>
      </h1>
      <div className="flex w-full flex-1 overflow-y-auto overflow-x-hidden">
        <div className="h-full flex-1">
          <div className="px-[16px] py-[12px] flex justify-start items-center">
            <span className="text-[16px] font-semibold text-[#666]">
              邮箱地址：
            </span>
            {emailName ? (
              <span className="text-[24px] font-bold">{emailName}</span>
            ) : (
              <div className="emailLoading w-[120px] h-[36px] relative overflow-hidden rounded-[8px]" />
            )}
            <button
              onClick={() => handleCopyText(emailName)}
              className="text-[16px] text-[#999] ml-[12px] flex gap-[6px] items-center"
            >
              复制邮箱地址
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="copy"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path>
              </svg>
            </button>
            <button
              onClick={handleRefreshEmail}
              style={{
                color: refreshFlag ? "#ccc" : "#999",
                cursor: refreshFlag ? "not-allowed" : "pointer",
              }}
              className="text-[16px] text-[#999] ml-[12px] flex gap-[6px] items-center"
            >
              换个新邮箱
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="reload"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M909.1 209.3l-56.4 44.1C775.8 155.1 656.2 92 521.9 92 290 92 102.3 279.5 102 511.5 101.7 743.7 289.8 932 521.9 932c181.3 0 335.8-115 394.6-276.1 1.5-4.2-.7-8.9-4.9-10.3l-56.7-19.5a8 8 0 00-10.1 4.8c-1.8 5-3.8 10-5.9 14.9-17.3 41-42.1 77.8-73.7 109.4A344.77 344.77 0 01655.9 829c-42.3 17.9-87.4 27-133.8 27-46.5 0-91.5-9.1-133.8-27A341.5 341.5 0 01279 755.2a342.16 342.16 0 01-73.7-109.4c-17.9-42.4-27-87.4-27-133.9s9.1-91.5 27-133.9c17.3-41 42.1-77.8 73.7-109.4 31.6-31.6 68.4-56.4 109.3-73.8 42.3-17.9 87.4-27 133.8-27 46.5 0 91.5 9.1 133.8 27a341.5 341.5 0 01109.3 73.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 003 14.1l175.6 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c-.1-6.6-7.8-10.3-13-6.2z"></path>
              </svg>
            </button>
          </div>
          <div className="px-[16px] flex-1 flex flex-col">
            <span className="text-[16px] font-semibold text-[#666] flex items-center">
              收件箱：
              <svg
                onClick={() => getEmailList(emailName)}
                _ngcontent-rbj-c436=""
                id="arrow_loading"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-6 -6 36 36"
                className="arrow-loading cursor-pointer"
                width="36"
                height="36"
              >
                <path
                  _ngcontent-rbj-c436=""
                  stroke="none"
                  fill="#bac7da"
                  d="M16.2751 7.78995C13.932 5.44681 10.133 5.44681 7.78986 7.78995C7.02853 8.55128 6.51457 9.4663 6.24798 10.4351C6.24473 10.4499 6.24114 10.4646 6.23719 10.4793C6.17635 10.7064 6.12938 10.9339 6.09577 11.161C5.83159 12.9457 6.39255 14.7026 7.52624 15.9944C7.61054 16.0901 7.69842 16.1838 7.78986 16.2752C8.08307 16.5685 8.39909 16.825 8.7322 17.0448C9.25533 17.3892 9.84172 17.6568 10.4798 17.8278C10.7386 17.8971 10.9979 17.9484 11.2565 17.9825C12.9537 18.2061 14.6187 17.6866 15.8747 16.6415C16.0123 16.5265 16.1459 16.4044 16.2751 16.2752C16.2848 16.2655 16.2947 16.2561 16.3047 16.2469C17.0123 15.531 17.5491 14.627 17.8283 13.5851C17.9712 13.0517 18.5196 12.7351 19.053 12.878C19.5865 13.021 19.9031 13.5693 19.7602 14.1028C19.3141 15.7676 18.3745 17.1684 17.1409 18.1899C16.1883 18.9822 15.0949 19.5189 13.9515 19.8002C11.8607 20.3147 9.6028 19.9749 7.7328 18.7809C7.06855 18.3579 6.47841 17.8432 5.97519 17.2589C5.12341 16.2738 4.55173 15.1302 4.26015 13.9324C4.01698 12.9416 3.96104 11.8931 4.12168 10.8379C4.36697 9.20484 5.1183 7.63309 6.37564 6.37574C9.49984 3.25154 14.5652 3.25154 17.6894 6.37574L18.2332 6.91959L18.2337 5.49951C18.2338 5.05769 18.5921 4.69964 19.034 4.69979C19.4758 4.69995 19.8338 5.05825 19.8337 5.50007L19.8325 9.03277L19.8322 9.8325L19.0325 9.83249L18.9401 9.83249C18.8146 9.85665 18.6854 9.85665 18.5599 9.83248L15.5005 9.83245C15.0587 9.83245 14.7005 9.47427 14.7005 9.03244C14.7005 8.59062 15.0587 8.23245 15.5005 8.23245L16.7176 8.23246L16.2751 7.78995Z"
                  className="background-path"
                ></path>
                <defs _ngcontent-rbj-c436="">
                  <path
                    _ngcontent-rbj-c436=""
                    id="arrow"
                    stroke="none"
                    fill="none"
                    d="M16.2751 7.78995C13.932 5.44681 10.133 5.44681 7.78986 7.78995C7.02853 8.55128 6.51457 9.4663 6.24798 10.4351C6.24473 10.4499 6.24114 10.4646 6.23719 10.4793C6.17635 10.7064 6.12938 10.9339 6.09577 11.161C5.83159 12.9457 6.39255 14.7026 7.52624 15.9944C7.61054 16.0901 7.69842 16.1838 7.78986 16.2752C8.08307 16.5685 8.39909 16.825 8.7322 17.0448C9.25533 17.3892 9.84172 17.6568 10.4798 17.8278C10.7386 17.8971 10.9979 17.9484 11.2565 17.9825C12.9537 18.2061 14.6187 17.6866 15.8747 16.6415C16.0123 16.5265 16.1459 16.4044 16.2751 16.2752C16.2848 16.2655 16.2947 16.2561 16.3047 16.2469C17.0123 15.531 17.5491 14.627 17.8283 13.5851C17.9712 13.0517 18.5196 12.7351 19.053 12.878C19.5865 13.021 19.9031 13.5693 19.7602 14.1028C19.3141 15.7676 18.3745 17.1684 17.1409 18.1899C16.1883 18.9822 15.0949 19.5189 13.9515 19.8002C11.8607 20.3147 9.6028 19.9749 7.7328 18.7809C7.06855 18.3579 6.47841 17.8432 5.97519 17.2589C5.12341 16.2738 4.55173 15.1302 4.26015 13.9324C4.01698 12.9416 3.96104 11.8931 4.12168 10.8379C4.36697 9.20484 5.1183 7.63309 6.37564 6.37574C9.49984 3.25154 14.5652 3.25154 17.6894 6.37574L18.2332 6.91959L18.2337 5.49951C18.2338 5.05769 18.5921 4.69964 19.034 4.69979C19.4758 4.69995 19.8338 5.05825 19.8337 5.50007L19.8325 9.03277L19.8322 9.8325L19.0325 9.83249L18.9401 9.83249C18.8146 9.85665 18.6854 9.85665 18.5599 9.83248L15.5005 9.83245C15.0587 9.83245 14.7005 9.47427 14.7005 9.03244C14.7005 8.59062 15.0587 8.23245 15.5005 8.23245L16.7176 8.23246L16.2751 7.78995Z"
                  ></path>
                  <clipPath _ngcontent-rbj-c436="" id="arrow-clip">
                    <use _ngcontent-rbj-c436="" xlinkHref="#arrow"></use>
                  </clipPath>
                </defs>
                <g _ngcontent-rbj-c436="" clip-path="url(#arrow-clip)">
                  <circle
                    _ngcontent-rbj-c436=""
                    cx="12"
                    cy="12"
                    r="5"
                    transform="rotate(365,12,12)"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="16"
                    stroke-dasharray="30"
                    stroke-dashoffset="0"
                  >
                    <animate
                      ref={svgAnimateRef}
                      _ngcontent-rbj-c436=""
                      attributeName="stroke-dashoffset"
                      values="0;-30"
                      begin="arrow_loading.click; 0.7s"
                      repeatCount="indefinite"
                      dur="18s"
                    ></animate>
                  </circle>
                </g>
                <use _ngcontent-rbj-c436="" xlinkHref="#arrow"></use>
                <animateTransform
                  _ngcontent-rbj-c436=""
                  id="transform_0"
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  from="0 0 0"
                  to="-10 0 0"
                  dur="0.07s"
                  begin="arrow_loading.click;"
                  repeatCount="1"
                ></animateTransform>
                <animateTransform
                  _ngcontent-rbj-c436=""
                  id="transform_1"
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  from="-45 0 0"
                  to="390 0 0"
                  dur="0.6s"
                  begin="transform_0.end"
                  repeatCount="1"
                ></animateTransform>
                <animateTransform
                  _ngcontent-rbj-c436=""
                  id="transform_2"
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  from="390 0 0"
                  to="360 0 0"
                  dur="0.15s"
                  begin="transform_1.end"
                  repeatCount="1"
                ></animateTransform>
              </svg>
            </span>
            <div className="py-[12px] flex-1 overflow-y-auto">
              {mailList.length ? (
                mailList.map((mail: any) => <div className="cursor-pointer flex gap-[30px]" key={mail.messageId}>
                  📧
                  <div className="flex-1 text-[#aaa]">from: { mail.from.text }</div>
                  <div className="flex-1">{ mail.subject }</div>
                </div>)
              ) : (
                <div className="w-full flex items-center justify-center mt-[120px] font-semibold text-[#999]">
                  <span className="text-[30px] mr-[8px]">📭</span>
                  暂无邮件
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showToast ? <div className="toast">✅复制成功</div> : null}
    </main>
  );
}
