/**
 * 단어 끝 글자의 받침 유무에 따라 적절한 조사를 붙여주는 함수
 */
export const appendJosa = (
  word: string,
  josaPair: [string, string],
): string => {
  if (!word) return "";

  const lastChar = word.trim().slice(-1);
  const charCode = lastChar.charCodeAt(0);

  // 한글 범위(가 ~ 힣) 밖인 경우 (영문, 숫자 등) 기본값 처리
  if (charCode < 0xac00 || charCode > 0xd7a3) {
    return `${word}${josaPair[1]}`; // 보통 받침 없는 조사를 기본으로 사용
  }

  // (charCode - 44032) % 28 > 0 이면 받침이 있음
  const hasBatchim = (charCode - 0xac00) % 28 > 0;

  // 받침 있음: josaPair[0] ('이야' / '이' / '을')
  // 받침 없음: josaPair[1] ('야' / '가' / '를')
  return `${word}${hasBatchim ? josaPair[0] : josaPair[1]}`;
};
