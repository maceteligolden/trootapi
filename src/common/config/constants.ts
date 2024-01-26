export enum TicketStatus {
    PENDING = "Pending",
    WORKCREATED = "Work_Created",
    WORKASSIGNED = "Work_Assigned",
    PENDINGAPPROVAL = "Pending_Approval",
    WORKSTARTED = "Work_Started",
    WORKCOMPLETE = "Work_Complete"
}

export enum TicketPriority {
    LOW = "Low",
    NORMAL = "Normal",
    HIGH = "High"
}

export enum UserRole {
    AGENT = "AGENT",
    ADMIN = "ADMIN",
    CUSTOMER = "CUSTOMER"
}