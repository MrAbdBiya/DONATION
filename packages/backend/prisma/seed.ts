import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { addMinutes } from 'date-fns';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('Password123!', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@mediqueuepro.com' },
    update: {},
    create: {
      email: 'admin@mediqueuepro.com',
      passwordHash,
      firstName: 'Amina',
      lastName: 'Admin',
      role: UserRole.ADMIN,
      phone: '+212612345678'
    }
  });

  const doctorUser = await prisma.user.upsert({
    where: { email: 'doctor@mediqueuepro.com' },
    update: {},
    create: {
      email: 'doctor@mediqueuepro.com',
      passwordHash,
      firstName: 'Youssef',
      lastName: 'Haddad',
      role: UserRole.DOCTOR,
      phone: '+212634567890'
    }
  });

  const patientUser = await prisma.user.upsert({
    where: { email: 'patient@mediqueuepro.com' },
    update: {},
    create: {
      email: 'patient@mediqueuepro.com',
      passwordHash,
      firstName: 'Sara',
      lastName: 'El Amrani',
      role: UserRole.PATIENT,
      phone: '+212612398765'
    }
  });

  const doctor = await prisma.doctor.upsert({
    where: { userId: doctorUser.id },
    update: {},
    create: {
      userId: doctorUser.id,
      licenseNumber: 'MED-001',
      specializations: ['Family Medicine', 'Preventive Care']
    }
  });

  const patient = await prisma.patient.upsert({
    where: { userId: patientUser.id },
    update: {},
    create: {
      userId: patientUser.id,
      dateOfBirth: new Date('1992-06-12'),
      address: '123 Main Street, Beni Mellal',
      bloodType: 'A+',
      allergies: ['Penicillin']
    }
  });

  const appointment = await prisma.appointment.create({
    data: {
      patientId: patient.id,
      doctorId: doctor.id,
      scheduledDate: addMinutes(new Date(), 60),
      reason: 'Annual check-up',
      status: 'CONFIRMED'
    }
  });

  await prisma.queueEntry.create({
    data: {
      appointmentId: appointment.id,
      queueNumber: 12,
      estimatedTime: 30,
      status: 'WAITING'
    }
  });

  await prisma.schedule.create({
    data: {
      doctorId: doctor.id,
      date: new Date(),
      workingSlots: ['09:00', '09:30', '10:00', '10:30', '11:00'],
      blockedSlots: ['12:00']
    }
  });

  console.info('Seed data created successfully', { admin, doctor, patient, appointment });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
