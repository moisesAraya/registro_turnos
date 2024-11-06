"use strict";
import { getRepository } from "typeorm";
import { QRCode } from "../entity/QRCode.js";
import QRCodeLib from "qrcode";

export async function createQRCodeService(data) {
  try {
    const qrCodeRepository = getRepository(QRCode);

    const codeData = await QRCodeLib.toDataURL(data.content); // Asumiendo que el cuerpo tiene un campo 'content'

    const newQRCode = qrCodeRepository.create({ data: data.content, codeData });
    await qrCodeRepository.save(newQRCode);

    return [newQRCode, null];
  } catch (error) {
    return [null, error.message];
  }
}

export async function getQRCodeService({ id }) {
  try {
    const qrCodeRepository = getRepository(QRCode);
    const qrCode = await qrCodeRepository.findOne(id);

    if (!qrCode) {
      return [null, "Código QR no encontrado"];
    }

    return [qrCode, null];
  } catch (error) {
    return [null, error.message];
  }
}

export async function getQRCodesService() {
  try {
    const qrCodeRepository = getRepository(QRCode);
    const qrCodes = await qrCodeRepository.find({ order: { createdAt: "DESC" } });

    return [qrCodes, null];
  } catch (error) {
    return [null, error.message];
  }
}

export async function updateQRCodeService({ id }, data) {
  try {
    const qrCodeRepository = getRepository(QRCode);
    let qrCode = await qrCodeRepository.findOne(id);

    if (!qrCode) {
      return [null, "Código QR no encontrado"];
    }

    const codeData = await QRCodeLib.toDataURL(data.content);

    qrCode.data = data.content;
    qrCode.codeData = codeData;

    await qrCodeRepository.save(qrCode);

    return [qrCode, null];
  } catch (error) {
    return [null, error.message];
  }
}

export async function deleteQRCodeService({ id }) {
  try {
    const qrCodeRepository = getRepository(QRCode);
    const qrCode = await qrCodeRepository.findOne(id);

    if (!qrCode) {
      return [null, "Código QR no encontrado"];
    }

    await qrCodeRepository.remove(qrCode);

    return [qrCode, null];
  } catch (error) {
    return [null, error.message];
  }
}
