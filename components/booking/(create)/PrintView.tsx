// @/components/booking/create/PrintView.tsx
import { Customer, Receiver, PickupLocation, BookingFormData } from "./types";

interface PrintViewProps {
  formData: BookingFormData;
  bookingNumber: string;
}

const PrintView = ({ formData, bookingNumber }: PrintViewProps) => {
  const currentDate = new Date();
  const bookedDate = currentDate.toLocaleDateString("en-IN");
  const bookedTime = currentDate.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="p-8 bg-white text-black space-y-6 max-w-4xl mx-auto border-2 border-gray-800">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-800 pb-4">
        <h1 className="text-3xl font-bold">TECH-NEEDER CORNER PVT. LTD.</h1>
        <p className="text-lg">(EF-36) (Royal Law)</p>
      </div>

      {/* Document Info */}
      <div className="grid grid-cols-2 gap-4 border-b-2 border-gray-800 pb-4">
        <div>
          <p>
            <strong>Document No:</strong> {formData.documentNo}
          </p>
          <p>
            <strong>Booking No:</strong> {bookingNumber}
          </p>
        </div>
        <div className="text-right">
          <p>
            <strong>Date:</strong> {bookedDate}
          </p>
          <p>
            <strong>Time:</strong> {bookedTime}
          </p>
        </div>
      </div>

      {/* Sender and Receiver */}
      <div className="grid grid-cols-2 gap-6 border-b-2 border-gray-800 pb-4">
        {/* Sender */}
        <div>
          <h3 className="font-bold text-lg mb-2 border-b border-gray-800 pb-1">
            SENDER
          </h3>
          {formData.sender && (
            <div className="space-y-1">
              <p>
                <strong>Name:</strong> {formData.sender.name}
              </p>
              <p>
                <strong>Contact:</strong> {formData.sender.contactPerson}
              </p>
              <p>
                <strong>Address:</strong> {formData.sender.address1},{" "}
                {formData.sender.address2}
              </p>
              <p>
                <strong>City:</strong> {formData.sender.city}
              </p>
              <p>
                <strong>Station:</strong> {formData.sender.station}
              </p>
              <p>
                <strong>Phone:</strong> {formData.sender.mobileNo}
              </p>
              {formData.sender.gstin && (
                <p>
                  <strong>GSTIN:</strong> {formData.sender.gstin}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Receiver */}
        <div>
          <h3 className="font-bold text-lg mb-2 border-b border-gray-800 pb-1">
            RECEIVER
          </h3>
          {formData.receiver && (
            <div className="space-y-1">
              <p>
                <strong>Name:</strong> {formData.receiver.name}
              </p>
              <p>
                <strong>Address:</strong> {formData.receiver.address}
              </p>
              <p>
                <strong>City:</strong> {formData.receiver.city}
              </p>
              <p>
                <strong>Pincode:</strong> {formData.receiver.pincode}
              </p>
              <p>
                <strong>Phone:</strong> {formData.receiver.mobileNo}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Pickup Location */}
      {formData.pickupLocation && (
        <div className="border-b-2 border-gray-800 pb-4">
          <h3 className="font-bold text-lg mb-2">PICKUP LOCATION</h3>
          <div className="space-y-1">
            <p>
              <strong>Name:</strong> {formData.pickupLocation.name}
            </p>
            <p>
              <strong>Address:</strong> {formData.pickupLocation.address},{" "}
              {formData.pickupLocation.city}
            </p>
            <p>
              <strong>Contact:</strong> {formData.pickupLocation.contactPerson}{" "}
              ({formData.pickupLocation.mobileNo})
            </p>
          </div>
        </div>
      )}

      {/* Booking Details */}
      <div className="border-b-2 border-gray-800 pb-4">
        <h3 className="font-bold text-lg mb-2">BOOKING DETAILS</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p>
              <strong>Contents:</strong> {formData.contents}
            </p>
            <p>
              <strong>Pay Mode:</strong> {formData.payMode}
            </p>
            <p>
              <strong>Forward To:</strong> {formData.forwardTo}
            </p>
            <p>
              <strong>Thru:</strong> {formData.thru}
            </p>
          </div>
          <div className="space-y-1">
            <p>
              <strong>Weight:</strong> {formData.weight} kg
            </p>
            <p>
              <strong>Charge Weight:</strong> {formData.chargeWeight} kg
            </p>
            <p>
              <strong>Rate:</strong> ₹{formData.rate}
            </p>
          </div>
        </div>
      </div>

      {/* Charges */}
      <div className="border-b-2 border-gray-800 pb-4">
        <h3 className="font-bold text-lg mb-2">CHARGES</h3>
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <p>
              <strong>FOV Amt</strong>
            </p>
            <p>₹{formData.fovAmt}</p>
          </div>
          <div>
            <p>
              <strong>Charges</strong>
            </p>
            <p>₹{formData.charges}</p>
          </div>
          <div>
            <p>
              <strong>Other Add/Less</strong>
            </p>
            <p>₹{formData.otherAddLess}</p>
          </div>
          <div>
            <p>
              <strong>Net Charges</strong>
            </p>
            <p>₹{formData.netCharges}</p>
          </div>
        </div>
      </div>

      {/* Final Amount */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p>
            <strong>Discount</strong>
          </p>
          <p>₹{formData.disc}</p>
        </div>
        <div>
          <p>
            <strong>Fuel %</strong>
          </p>
          <p>{formData.fuelPercent}%</p>
        </div>
        <div>
          <p>
            <strong>Tax</strong>
          </p>
          <p>₹{formData.tax}</p>
        </div>
      </div>

      {/* Net Amount */}
      <div className="text-center border-t-2 border-gray-800 pt-4">
        <p className="text-2xl font-bold">NET AMOUNT: ₹{formData.netAmount}</p>
      </div>

      {/* Footer */}
      <div className="text-center border-t-2 border-gray-800 pt-4">
        <p className="text-sm">This is a computer generated document</p>
        <p className="text-sm">Booked By: ADMIN | Date: {bookedDate}</p>
      </div>
    </div>
  );
};

export default PrintView;
