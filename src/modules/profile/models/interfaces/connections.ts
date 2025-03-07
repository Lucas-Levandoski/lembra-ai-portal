
export interface IConnections {
  whatsapp: IWhatsappConnection
}

export interface IWhatsappConnection {
  isConnected: boolean;
  phoneNumber?: string;
}