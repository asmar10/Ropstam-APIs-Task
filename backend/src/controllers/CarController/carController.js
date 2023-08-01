import Car from "../../models/car/car.js";

//create
// Each car has a unique Reg. No so no duplicates can be added. validated in the schema
export const addCar = async (req, res) => {
    const carInfo = req.body;
    let car;
    try {
        car = new Car({
            category: carInfo.category,
            color: carInfo.color,
            model: carInfo.model,
            make: carInfo.make,
            registrationNo: carInfo.registrationNo
        })

        const temp = await car.save()
        res.status(200).json(temp)

    } catch (err) {
        console.log(err.message)
        res.status(400).send(err.message)
    }
};

//Read
export const getAllCars = async (req, res) => {
    try {
        const data = await Car.find({});
        res.status(200).json(data);
    } catch (err) {
        res.status(401).send(err.message);
    }
};

export const getCarByCategory = async (req, res) => {
    try {
        const data = await Car.find({ category: req.body.category });
        res.status(200).json(data);
    } catch (err) {
        res.status(401).send(err.message);
    }
};

export const getCarByColor = async (req, res) => {
    try {
        const data = await Car.find({ color: req.body.color });
        res.status(200).json(data);
    } catch (err) {
        res.status(401).send(err.message);
    }
};

export const getCarByReg = async (req, res) => {
    try {
        const data = await Car.find({ registrationNo: req.body.regNo });
        res.status(200).json(data);
    } catch (err) {
        res.status(401).send(err.message);
    }
};

//Update
//Updates the car data based on the registration No.
export const updateCar = async (req, res) => {
    try {
        const registrationNo = req.params.registrationNo;

        const updateFields = req.body; //contains all the fields that are being updated

        const updatedCar = await Car.findOneAndUpdate(
            { registrationNo: registrationNo },
            updateFields,
            { new: true } // Return the updated document 
        );
        if (!updatedCar) {
            throw new Error("Car Not Found")
        }
        res.status(200).json({ status: true, message: "Updated Successfully", data: updatedCar });
    } catch (err) {
        res.status(400).send(err.message);
    }
};

//Delete
export const deleteCar = async (req, res) => {
    try {
        const data = await Car.findOneAndDelete({ registrationNo: req.params.registrationNo });
        if (data) {
            res.status(200).json({ status: true, message: "Deleted Successfully" });
        }
        else {
            res.status(400).json({ status: false, message: "Doesn't Exist" });
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const data = await Car.deleteMany({ category: req.params.category });
        console.log(data)
        if (data.deletedCount != 0) {
            res.status(200).json({ status: true, message: "Deleted Successfully" });
        }
        else {
            res.status(400).json({ status: false, message: "Doesn't Exist" });
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
};
