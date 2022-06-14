// eslint-disable-next-line import/no-unresolved
const Prescription = require('../models/prescription.model');
const { successResponse } = require('../utils/responses');

class PrescriptionController {
  constructor(dependencies = {}) {
    this.dependencies = dependencies;
    this.e = this.dependencies.errors;
    this.createPrescription = this.createPrescription.bind(this);
    this.getPrescription = this.getPrescription.bind(this);
    this.getAllPrescription = this.getAllPrescription.bind(this);
    this.updatePrescription = this.updatePrescription.bind(this);
    this.deletePrescription = this.deletePrescription.bind(this);
  }

  async createPrescription(req, res) {
    const { name } = req.body;
    const prescription = await Prescription.findOne({ name });
    if (prescription) {
      throw new this.e.BadRequestError('You have submitted this prescription already');
    }
    const newPrescription = await Prescription.create({
      name: req.body.name,
      user_id: req.body.user_id,
      prescription_image: req.body.prescription_image,
      brand: req.body.brand,
      quantity: req.body.quantity,
    });
    newPrescription.save();
    return successResponse(res, 200, newPrescription, 'Prescription submitted successfully');
  }

  async getPrescription(req, res) {
    const { _id } = req.params;
    const prescription = await Prescription.findById({ _id }).lean();
    if (!prescription) {
      throw new this.e.BadRequestError('You do not have prescription record, please create a prescription');
    }
    return successResponse(res, 200, prescription, ' Prescription retrieved successfully');
  }

  async getAllPrescription(req, res) {
    const prescriptions = await Prescription.find({}).lean();
    if (!prescriptions) {
      throw new this.e.BadRequestError('No prescription found');
    }
    return successResponse(res, 200, prescriptions, 'All prescriptions retrieved successfully');
  }

  async updatePrescription(req, res) {
    const { _id } = req.params;
    const prescription = await Prescription.findById({ _id }).lean();
    if (!prescription) {
      throw new this.e.BadRequestError('You do not have prescription record, please create a prescription');
    }
    const { name } = req.body;
    const prescriptionExist = await Prescription.findOne({ name }).lean();
    if (prescriptionExist) {
      throw new this.e.BadRequestError('You have submitted this prescription with this name already');
    }
    const updatePrescription = await Prescription.findByIdAndUpdate({ _id }, {
      name: req.body.name,
      prescription_image: req.body.prescription_image,
      brand: req.body.brand,
      quantity: req.body.quantity,
    }, { new: true }).lean();
    return successResponse(res, 200, updatePrescription, 'Prescription updated successfully');
  }

  async deletePrescription(req, res) {
    const { _id } = req.params;
    const prescription = await Prescription.findById({ _id }).lean();
    if (!prescription) {
      throw new this.e.BadRequestError('Prescription does not exist');
    }
    const deletePrescription = await Prescription.findByIdAndDelete({ _id }).lean();
    return successResponse(res, 200, deletePrescription, 'Prescription deleted successfully');
  }
}
module.exports = PrescriptionController;
