const grpc = require("@grpc/grpc-js");
const grpcAddress = require("./config.js");
const ContactClient = require("../gen/proto/contact_grpc_pb.js").ContactClient;
const {
  RecordUpdate,
  RecordID,
  Details,
  Address,
} = require("../gen/proto/contact_pb.js");
const { Gender } = require("../gen/proto/user_pb.js");

const google_protobuf_empty_pb = require("google-protobuf/google/protobuf/Empty_pb.js");

const client = new ContactClient(
  grpcAddress,
  grpc.credentials.createInsecure()
);

async function createContact(
  jwt,
  {
    firstName = "",
    lastName = "",
    gender = "",
    email = "",
    mobileNumber = "",
    address = {},
  }
) {
  return new Promise((resolve, reject) => {
    const meta = new grpc.Metadata();
    meta.add("Authorization", "Bearer " + jwt);
    const details = new Details();
    const address = new Address();
    address.setStreet(address.street ?? "");
    address.setArea(address.area ?? "");
    address.setCity(address.city ?? "");
    address.setProvinceState(address.provinceState ?? "");
    address.setCountry(address.country ?? "");
    address.setPincode(address.pincode ?? "");
    details.setFirstName(firstName);
    details.setLastName(lastName);
    switch (gender) {
      case "male":
        gender = Gender.MALE;
        break;
      case "female":
        gender = Gender.FEMALE;
        break;
      default:
        gender = Gender.UNSPECIFIED;
    }
    details.setGender(gender);
    details.setEmail(email);
    details.setMobileNumber(mobileNumber);
    details.setAddress(address);

    client.create(details, meta, (error, response) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(response.toObject());
    });
  });
}

async function getContact(jwt, id) {
  return new Promise((resolve, reject) => {
    const recordId = new RecordID();
    recordId.setId(id);
    const meta = new grpc.Metadata();
    meta.add("Authorization", "Bearer " + jwt);
    client.get(recordId, meta, (error, response) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(response.toObject());
    });
  });
}

async function getAllContacts(jwt) {
  return new Promise((resolve, reject) => {
    const meta = new grpc.Metadata();
    meta.add("Authorization", "Bearer " + jwt);
    client.getAll(
      new google_protobuf_empty_pb.Empty(),
      meta,
      (error, response) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(response.toObject());
      }
    );
  });
}

async function updateContact(jwt, id, patch = {}) {
  return new Promise((resolve, reject) => {
    const meta = new grpc.Metadata();
    meta.add("Authorization", "Bearer " + jwt);
    const values = {};
    if (patch.firstName) {
      values["first_name"] = patch.firstName;
    }
    if (patch.lastName) {
      values["last_name"] = patch.lastName;
    }
    if (patch.gender) {
      switch (patch.gender) {
        case "male":
          values["gender"] = Gender.MALE;
          break;
        case "female":
          values["gender"] = Gender.FEMALE;
          break;
        default:
          values["gender"] = Gender.UNSPECIFIED;
      }
    }
    if (patch.email) {
      values["email"] = patch.email;
    }
    if (patch.mobileNumber) {
      values["mobile_number"] = patch.mobileNumber;
    }
    if (patch.address) {
      if (patch.address.street) {
        values["address.street"] = patch.address.street;
      }
      if (patch.address.area) {
        values["address.area"] = patch.address.area;
      }
      if (patch.address.city) {
        values["address.city"] = patch.address.city;
      }
      if (patch.address.provinceState) {
        values["address.province_state"] = patch.address.provinceState;
      }
      if (patch.address.country) {
        values["address.country"] = patch.address.country;
      }
      if (patch.address.pincode) {
        values["address.pincode"] = patch.address.pincode;
      }
    }
    const recordUpdate = new RecordUpdate();
    recordUpdate.setId(id);
    recordUpdate.setValues(values);
    client.update(recordUpdate, meta, (error, response) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(response.toObject());
    });
  });
}

async function deleteContact(jwt, id) {
  return new Promise((resolve, reject) => {
    const meta = new grpc.Metadata();
    meta.add("Authorization", "Bearer " + jwt);
    const recordId = new RecordID();
    recordId.setId(id);
    client.delete(recordId, meta, (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}

module.exports = {
  createContact,
  getContact,
  getAllContacts,
  updateContact,
  deleteContact,
};
