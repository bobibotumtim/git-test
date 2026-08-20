import { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import axios from "axios";
import bcrypt from "bcryptjs";
import { Key, Lock } from "lucide-react";

export default function ChangePasswordForm({ setIsShowChangePass }) {
    const userAccount = JSON.parse(localStorage.getItem("userAccount"));
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const checkPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

    const handleChangePassword = async (event) => {
        event.preventDefault();

        if (!oldPassword || !newPassword || !confirmPassword) {
            alert("Please fill in all password fields");
            return;
        }

        if (!userAccount?.id) {
            alert("Your login session is invalid. Please log in again.");
            return;
        }

        if (!checkPass.test(newPassword)) {
            alert("New password must contain uppercase, lowercase, number, special character and be at least 6 characters long");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("Password confirmation does not match");
            return;
        }

        setIsSubmitting(true);
        try {
            // Always verify against the latest server data. The password stored in
            // localStorage may be stale after an admin updates an account.
            const userResponse = await axios.get(
                `http://localhost:9999/users/${encodeURIComponent(userAccount.id)}`
            );
            const currentUser = userResponse.data;
            const isOldPasswordCorrect = await bcrypt.compare(
                oldPassword,
                currentUser.password
            );

            if (!isOldPasswordCorrect) {
                alert("Old password is incorrect");
                return;
            }

            const hashPass = await bcrypt.hash(newPassword, 10);
            const updateResponse = await axios.patch(
                `http://localhost:9999/users/${encodeURIComponent(userAccount.id)}`,
                { password: hashPass }
            );

            localStorage.setItem(
                "userAccount",
                JSON.stringify(updateResponse.data)
            );

            alert("Password changed successfully!");
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setIsShowChangePass(false);
        } catch (error) {
            console.error(error);
            if (error.response?.status === 404) {
                alert("Account not found. Please log in again.");
            } else {
                alert("Error changing password. Please check that the JSON Server is running.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form className="p-3" onSubmit={handleChangePassword}>
            <h4 className="mb-3">Change Password</h4>

            <Form.Group className="mb-3">
                <Form.Label>Old Password</Form.Label>
                <InputGroup>
                    <InputGroup.Text>
                        <Key size={16} />
                    </InputGroup.Text>
                    <Form.Control
                        type = "password"
                        placeholder="Enter old password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <InputGroup>
                    <InputGroup.Text>
                        <Lock size={16} />
                    </InputGroup.Text>
                    <Form.Control
                        type = "password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <InputGroup>
                    <InputGroup.Text>
                        <Lock size={16} />
                    </InputGroup.Text>
                    <Form.Control
                        type = "password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </InputGroup>
            </Form.Group>
            <div className="button-group">
                <Button variant="success" type="submit" disabled={isSubmitting} className="w-20">
                    {isSubmitting ? "Saving..." : "Save"}
                </Button>
                <Button variant="secondary" type="button" disabled={isSubmitting} onClick={() => {
                    setIsShowChangePass(false)
                }} className="w-20">
                    Cancel
                </Button>
            </div>
        </Form>
    );
}
