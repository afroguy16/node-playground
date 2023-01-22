import sinon from "sinon";

import { ErrorService } from "../../../middlewares/validators/ErrorService";
import { ERROR_CODE_UNPROCESSED_ENTITY } from "../../constants";
import { postSignup } from "../auth";

describe("Signup Controller", () => {
  it("should send an error response with a status of unprocessed entity and the message with the validator's messages if there is any validation error", () => {
    // set up dummy request. only the keys are important, the values doesn't matter, they aren't tested here
    const req = {
      body: {
        username: "",
        email: "",
        password: "",
      },
    };

    // set up dummy response, same as the req, only the function signature is required
    const res = {
      status: (status) => null,
      json: (data) => null,
    };

    // stub the response, so we can listen if they have been called
    sinon.stub(res, "status").returnsThis();
    sinon.stub(res, "json");

    // instead of invoking the validators, instantiate the error service and add a fake error directly. This mimics what an error middleware validator would do with the request
    const error = new ErrorService(req);
    error.setError("fakePath", "Fake error message");
    const errors = (req as any).validator.getErrors();

    // call the postSignup Controller
    postSignup(req, res);

    sinon.assert.calledWith(res.status, ERROR_CODE_UNPROCESSED_ENTITY);
    sinon.assert.calledWith(res.json, {
      message: "Auth failed",
      error: errors,
    });
  });
});