const Bus = require('../models/Bus');

class BusController {
    // Xem tất cả các xe khách
    index(req, res) {
        Bus.find({})
            .then(buses => {
                res.json(buses); // Trả về dữ liệu dạng JSON
            })
            .catch(err => res.status(500).json({ error: err.message }));
    }

    // Thêm xe khách
    create(req, res) {
        const newBus = new Bus(req.body);
        newBus.save()
            .then(bus => res.json(bus)) // Trả về xe vừa thêm dưới dạng JSON
            .catch(err => res.status(500).json({ error: err.message }));
    }

    // Sửa thông tin xe khách
    update(req, res) {
        Bus.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(bus => res.json(bus)) // Trả về xe đã được sửa dưới dạng JSON
            .catch(err => res.status(500).json({ error: err.message }));
    }

    // Xóa xe khách
    delete(req, res) {
        Bus.findByIdAndDelete(req.params.id)
            .then(() => res.json({ message: 'Bus deleted' })) // Trả về thông báo sau khi xóa
            .catch(err => res.status(500).json({ error: err.message }));
    }
}

module.exports = new BusController();
