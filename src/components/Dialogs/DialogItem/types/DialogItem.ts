export type DialogItemPropsType = {
    name: string;
    id: number;
    lastMessage?: string;
    lastMessageTime?: string;
    isActive: boolean;
    isOnline?: boolean;
    unreadCount?: number;
    onSelect: (id: number) => void;
}