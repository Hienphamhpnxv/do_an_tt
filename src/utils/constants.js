export const ROLES = {
  QL: "QL",
  CN: "CN",
  PCN: "PCN",
  TV: "TV",
  CTV: "CTV",
};

export const ROLES_EXPAND = {
  QL: "Quản lý",
  CN: "Chủ nhiệm",
  PCN: "Phó chủ nhiệm",
  TV: "Thành viên",
  CTV: "Cộng tác viên",
};

export const API_END_POINT = {
  ADMIN: "admin",
  CHAIRMAN: "chairman",
  MEMBER: "member",
  COLLABORATOR: "collaborator",
};

export const COMMON_WORK_STATUS = {
  0: {
    name: "Chờ đợi",
    color: "secondary",
    value: 0,
  },
  1: {
    name: "Đang thực hiện",
    color: "warning",
    value: 1,
  },
  2: {
    name: "Hoàn thành",
    color: "success",
    value: 2,
  },
};

export const STATUS_ACTIVE_CLASSROOM = {
  PENDING: 0,
  ACTIVE: 1,
  STOP_ACTIVE: 2,
};
