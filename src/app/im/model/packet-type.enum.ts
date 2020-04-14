export enum PacketType {
  CONNECT = 0,
  CONN_ACK = 1,
  PING = 2,
  PONG = 3,
  DISCONNECT = 4,

  // 消息相关字段编号范围:Msg 21~50
  MSG_DATA = 5, // 消息请求
  MSG_DATA_ACK = 6, // 消息回执

  // 群组相关字段编号范围:TEAM 51~
  CREATE_TEAM_REQ = 51,
  DISMISS_TEAM_REQ = 52,
  QUERY_MEMBER_LIST_REQ = 53
}
