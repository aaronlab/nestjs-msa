import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservation.repository';
import { PAYMENTS_SERVICE } from '@app/common/constants';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
import Stripe from 'stripe';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationRepository: ReservationsRepository,
    @Inject(PAYMENTS_SERVICE) private readonly paymentsService: ClientProxy,
  ) {}

  async create(createReservationDto: CreateReservationDto, userId: string) {
    return this.paymentsService
      .send<Stripe.Response<Stripe.PaymentIntent>>(
        'create_charge',
        createReservationDto.charge,
      )
      .pipe(
        map((res) => {
          return this.reservationRepository.create({
            ...createReservationDto,
            timestamp: new Date(),
            userId,
            invoiceId: res.id,
          });
        }),
      );
  }

  async findAll() {
    return this.reservationRepository.find({});
  }

  async findOne(id: string) {
    return this.reservationRepository.findOne({
      _id: id,
    });
  }

  async update(id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationRepository.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: updateReservationDto,
      },
    );
  }

  async remove(id: string) {
    return this.reservationRepository.findOneAndDelete({
      _id: id,
    });
  }
}
