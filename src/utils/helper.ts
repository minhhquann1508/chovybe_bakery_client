import moment from "moment";

export const formatDate = (date: string) => {
  return moment(date).format("HH:mm DD/MM/YYYY");
};

export const isTokenExpired = (token: string): boolean => {
  if (!token) return true;

  try {
    const payloadBase64 = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));

    if (!decodedPayload.exp) return true;

    const currentTime = Math.floor(Date.now() / 1000); // Giây
    return decodedPayload.exp < currentTime;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err: unknown) {
    return true;
  }
};
