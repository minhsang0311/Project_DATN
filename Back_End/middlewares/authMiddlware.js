const jwt = require("jsonwebtoken");
const fs = require("fs");
// const PRIVATE_KEY = fs.readFileSync("private-key.txt", "utf8");
const PRIVATE_KEY =`MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCzuFXnz5wsds5U
v50NXxkHIyCE+oWmoYA9bMMoEBu+bN4NBe+9MtV1CM2TJhY6RposEpfB6NE9YA0o
vJgdlGd3zZaiM8tzjPUDYojQGbg3s6lraUUHTPi3ND7OTaOFj2jlLWR1gmVy4s1V
CUMq/nbQ4OKFDT2WFFTH2Jotbl2cACstf6ZSlHWm5jHcGG88HE5YQw7uzPYv33gg
CX1QM4U0Ht5ot4RzCSwYwocfOEiZ6skfcv/em4xbIXsFI6/+9KLAPS717SlycJJR
vdy4l9vGd/8EFk7IjB/bgb8l/OJ0yEotjsEl5EatK8b/toOIFMuMClxDd0bKdDzo
aQquBJm5AgMBAAECggEASreb63SaUrgP/xbspecAAkId3ntC/mxNYvwpRKoxxqD/
Tj3GFowgR3hh80fV3OOGbEVMl38CIrigr+t8eGu++oVcF1JeRst2/7HC/HV865eD
m5bX7nmXO596bw3DKp9dNk6BYgNUxwc4454msSS65Ati0XsYPCF2v+Ey9ClavKR3
NszbufJ/B4gnje+TYd1dJPcY5XFCSAxLeI9Muw4EAI/HhNQlxfG0ggopEB/teveV
HXyFwRpXYV4WG+/WQnPmiMCmx6w2nR210Q6ICGIGmcAii4WGRMqcapgNMq54BIUt
+nnnXlUBxEPFamTdSc/UOe+IwpmMwMYC2uMKxZli6wKBgQD2pOCW8oPAOYRL09vJ
7N9cP5BDqWGDgoDVSYhqcqpoV+385eqxas5pQSQNURGMg8pKoFuP6XOLG83cnCXO
jZaXfKSsVrD6YFJW7+42qcyD36a+CXietGtQPmLgNNmED1HlHFdMEoWEARWboYYM
hGiweSn68OJ33DsZ/cG6Kr7OSwKBgQC6iZHSPnM2pWcOVY2LYMEI+zeVtLXZtSYK
eBuUHmRN9hoFORWlEBRw8Twe4WE0A6BOyzgMLJI7m1gAieL2/Tm/n1ygXaJlo06M
zEtGxtsGYvmFYgY/9iD6aMSeIgW+AdG3YaxSkVbqAmxgwxxRnPPiRQAHGpISI8Hm
Jp9jQrVliwKBgQDD9UkvBK0iu0/eAwvbyaPIogPXjiqYlsYPL2X/1OyJDFtcE7u8
i/RE8elX3zIHJupBEljM5RjUzBlqDnGHQz0DTJd1CUeBFag1xFjJ+2wu1jGfSN0Z
kpS0Y2yhX7v1zUousq61FP4ZW9c0GEftiAG5O/rbkikMO+CFDPSvGakRMwKBgCw8
r75CXSRaeWQm2dhx65VrrjTslCu7D/hvn2qzAmqSsH0Imp94fsCCFRXlsR2atou5
GeOZNly4bFhEWvTj/Kv66QaG7hpYbipp0HhKdGrBUhdVtdG5VvzLl8VAoEf9OnTY
zvsNyKTaSkVwP+kC5buFTYphvL5ciIFCK45opYgdAoGAdCi0DlLUuoVQXW32Q50E
bz3UR6ztD6EweJb4u7Cyx6G3uSQyN43stuBxdzrFLL3+efQggsq34jQHBLfZEg8v
WilJio5ddYii3EMBNv7eszmEaBrICeaZJtK9cGMbUsra6yAa3bjBCz8FjcFm+ZsS
y/xS/zHy35xFnliUvUP2Hb0=`
const maxAge = 3*60*60;
const roleAdmin=1;

exports.authMiddleware = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
      return res.status(401).json({ message: "Không có token! Không phận sự miễn vào :)" });
  }

  token = token.split(' ')[1];
  jwt.verify(token, PRIVATE_KEY, (err, decodedData) => {
      if (err) return res.status(401).json({ message: "Lỗi xác thực token: " + err });
      if (decodedData.role !== roleAdmin) {
          return res.status(403).json({ message: "Bạn không đủ quyền để vào" });
      }
      req.user = decodedData;// lưu thông tin người xác thực
      next();
  });
};

// Route để kiểm tra token hợp lệ

exports.checkToken = (req, res) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).json({ valid: false });

  jwt.verify(token, PRIVATE_KEY, (err) => {
      if (err) return res.status(401).json({ valid: false });
      return res.status(200).json({ valid: true });
  });
};


