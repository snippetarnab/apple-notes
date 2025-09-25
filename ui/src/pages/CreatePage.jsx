import axios from "axios";
import { ArrowLeftIcon, Skull } from "lucide-react";
import api from "../lib/axios.js";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";

function CreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("All feilds are required.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/applenotes", {
        title,
        content,
      });
      toast.success("Note creaed successfully!.");
      navigate("/");
    } catch (error) {
      console.log("Error creatin gthe notes", error);
      if (error.response.status === 429) {
        toast.error("Too many requests. Please try again later.", {
          duration: 4000,
          icon: <Skull />,
        });
      } else {
        toast.error("Failed to create note.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label block  mb-2" htmlFor="title">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label" htmlFor="content">
                    <span className="label-text mb-2">Content</span>
                  </label>
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered h-32 w-full"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;
