

const validateRegister = (req, res, next) => {

    console.log("Entered Middlewaare")

  const { firstName, lastName, email, password } = req.body;

  if (!firstName)
    return res.status(400).json({
      status: false,
      message: "Please enter firstName",
      data: null,
    });
  if (!lastName)
    return res.status(400).json({
      status: false,
      message: "Please enter lastName",
      data: null,
    });
  if (!email)
    return res.status(400).json({
      status: false,
      message: "Please enter email",
      data: null,
    });
  if (!password)
    return res.status(400).json({
      status: false,
      message: "Please enter password",
      data: null,
    });


    console.log("Done with Middleware")

    next()

};


module.exports = { validateRegister }
