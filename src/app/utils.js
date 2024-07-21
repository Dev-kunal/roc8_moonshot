export function generateOTP() {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < 8; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }
  return otp;
}

export function getMaskedEmail(email) {
  if (!email) return "";
  const [username, domain] = email.split("@");
  const hiddenUsername =
    username.substring(0, Math.min(3, username.length)) +
    "*".repeat(Math.max(0, username.length - 3));
  return hiddenUsername + "@" + domain;
}

export const getPageRange = (totalPages, currentPage) => {
  const visiblePageCount = 7;
  const visiblePageCountHalf = Math.floor(visiblePageCount / 2);

  let startPage = Math.max(1, currentPage - visiblePageCountHalf);
  let endPage = Math.min(totalPages, startPage + visiblePageCount - 1);

  if (currentPage < visiblePageCountHalf + 1) {
    endPage = Math.min(visiblePageCount, totalPages);
  } else if (currentPage > totalPages - visiblePageCountHalf) {
    startPage = Math.max(1, totalPages - visiblePageCount + 1);
  }

  const result = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );
  return result;
};
