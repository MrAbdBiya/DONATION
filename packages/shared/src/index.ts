export type UserRole = 'PATIENT' | 'DOCTOR' | 'NURSE' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  phone: string | null;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: string;
  isActive: boolean;
}

export interface Patient {
  id: string;
  userId: string;
  dateOfBirth: string;
  address: string | null;
  bloodType: string | null;
  allergies: string[];
}

export interface Doctor {
  id: string;
  userId: string;
  licenseNumber: string;
  specializations: string[];
}

export type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  scheduledDate: string;
  queueNumber: number | null;
  status: AppointmentStatus;
  reason: string | null;
}

export interface Prescription {
  id: string;
  appointmentId: string;
  diagnosis: string;
  medications: { name: string; dosage: string; frequency: string }[];
  instructions: string;
}

export interface Schedule {
  id: string;
  doctorId: string;
  date: string;
  workingSlots: string[];
  blockedSlots: string[];
}

export type QueueStatus = 'WAITING' | 'CALLED' | 'IN_PROGRESS' | 'DONE' | 'SKIPPED';

export interface QueueEntry {
  id: string;
  appointmentId: string;
  queueNumber: number;
  estimatedTime: number;
  status: QueueStatus;
}

export type NotificationType = 'APPOINTMENT' | 'QUEUE' | 'PRESCRIPTION' | 'SYSTEM';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  sentAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface QueueSummary {
  activeQueueNumber: number | null;
  estimatedWaitMinutes: number;
  patientsAhead: number;
}

export interface AnalyticsSummary {
  appointmentsToday: number;
  averageWaitMinutes: number;
  prescriptionsIssued: number;
  occupancyRate: number;
}
