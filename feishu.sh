curl -X POST \
  "$ROBOT_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "msg_type": "interactive",
    "card": {
      "type": "template",
      "data": {
        "template_id": "'"$TEMPLATE_ID"'",
        "template_version_name": "'"$VERSION"'",
        "template_variable": {
          "CNB_REPO_SLUG": "'"$CNB_REPO_SLUG"'",
          "CNB_EVENT": "'"$CNB_EVENT"'",
          "CNB_BUILD_ID": "'"$CNB_BUILD_ID"'",
          "CNB_COMMITTER": "'"$CNB_COMMITTER"'",
          "CNB_COMMIT_MESSAGE_TITLE": "'"$CNB_COMMIT_MESSAGE_TITLE"'",
          "CNB_COMMIT_SHORT": "'"$CNB_COMMIT_SHORT"'",
          "CNB_BRANCH": "'"$CNB_BRANCH"'"
        }
      }
    }
  }'

echo ""