export function linkToEvent(link: string) {
  window.location.href = link;
}

export async function copyLink() {
  try {
    await navigator.clipboard.writeText(window.location.href);
    alert('링크가 클립보드에 복사되었습니다!');
    return true;
  } catch (err) {
    console.error('링크 복사에 실패했습니다:', err);
    alert('링크 복사에 실패했습니다. 다시 시도해주세요.');
    return false;
  }
}