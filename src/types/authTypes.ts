export interface GetTokenModel {
  id: string;
  isNew: boolean;
  accessToken: string;
  refreshToken: string;
}

export type ServiceType = 'kakao' | 'naver';

export interface GetTokenParams {
  code: string;
  local: string;
  protocol: string;
  serviceType: ServiceType;
}
